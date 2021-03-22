
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
function noop() { }
const identity = x => x;
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function null_to_empty(value) {
    return value == null ? '' : value;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

const active_docs = new Set();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        active_docs.forEach(doc => {
            const stylesheet = doc.__svelte_stylesheet;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            doc.__svelte_rules = {};
        });
        active_docs.clear();
    });
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = program.b - t;
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.30.0' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}

function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const height = parseFloat(style.height);
    const padding_top = parseFloat(style.paddingTop);
    const padding_bottom = parseFloat(style.paddingBottom);
    const margin_top = parseFloat(style.marginTop);
    const margin_bottom = parseFloat(style.marginBottom);
    const border_top_width = parseFloat(style.borderTopWidth);
    const border_bottom_width = parseFloat(style.borderBottomWidth);
    return {
        delay,
        duration,
        easing,
        css: t => 'overflow: hidden;' +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            `height: ${t * height}px;` +
            `padding-top: ${t * padding_top}px;` +
            `padding-bottom: ${t * padding_bottom}px;` +
            `margin-top: ${t * margin_top}px;` +
            `margin-bottom: ${t * margin_bottom}px;` +
            `border-top-width: ${t * border_top_width}px;` +
            `border-bottom-width: ${t * border_bottom_width}px;`
    };
}

/* src/core/nav.svelte generated by Svelte v3.30.0 */
const file = "src/core/nav.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (22:0) {#if state.showNav}
function create_if_block(ctx) {
	let nav;
	let ul;
	let t0;
	let li0;
	let a0;
	let li0_transition;
	let t2;
	let li1;
	let a1;
	let li1_transition;
	let current;
	let each_value = /*pages*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			nav = element("nav");
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = space();
			li0 = element("li");
			a0 = element("a");
			a0.textContent = "Education";
			t2 = space();
			li1 = element("li");
			a1 = element("a");
			a1.textContent = "Blog";
			attr_dev(a0, "href", "http://edu.sedscelestia.org");
			add_location(a0, file, 34, 4, 600);
			attr_dev(li0, "class", "svelte-juzme9");
			add_location(li0, file, 33, 3, 574);
			attr_dev(a1, "href", "http://blog.sedscelestia.org");
			add_location(a1, file, 37, 4, 690);
			attr_dev(li1, "class", "svelte-juzme9");
			add_location(li1, file, 36, 3, 664);
			attr_dev(ul, "class", "svelte-juzme9");
			add_location(ul, file, 23, 2, 385);
			attr_dev(nav, "class", "svelte-juzme9");
			add_location(nav, file, 22, 1, 377);
		},
		m: function mount(target, anchor) {
			insert_dev(target, nav, anchor);
			append_dev(nav, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append_dev(ul, t0);
			append_dev(ul, li0);
			append_dev(li0, a0);
			append_dev(ul, t2);
			append_dev(ul, li1);
			append_dev(li1, a1);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*state, pages, changePage*/ 7) {
				each_value = /*pages*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, t0);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			add_render_callback(() => {
				if (!li0_transition) li0_transition = create_bidirectional_transition(li0, slide, {}, true);
				li0_transition.run(1);
			});

			add_render_callback(() => {
				if (!li1_transition) li1_transition = create_bidirectional_transition(li1, slide, {}, true);
				li1_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			if (!li0_transition) li0_transition = create_bidirectional_transition(li0, slide, {}, false);
			li0_transition.run(0);
			if (!li1_transition) li1_transition = create_bidirectional_transition(li1, slide, {}, false);
			li1_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(nav);
			destroy_each(each_blocks, detaching);
			if (detaching && li0_transition) li0_transition.end();
			if (detaching && li1_transition) li1_transition.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(22:0) {#if state.showNav}",
		ctx
	});

	return block;
}

// (25:3) {#each pages as pj}
function create_each_block(ctx) {
	let li;
	let t_value = /*pj*/ ctx[4].page + "";
	let t;
	let li_class_value;
	let li_transition;
	let current;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			li = element("li");
			t = text(t_value);

			attr_dev(li, "class", li_class_value = "" + (null_to_empty(/*state*/ ctx[2].currentPage === /*pj*/ ctx[4].page
			? "active"
			: "") + " svelte-juzme9"));

			add_location(li, file, 25, 4, 417);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, t);
			current = true;

			if (!mounted) {
				dispose = listen_dev(
					li,
					"click",
					function () {
						if (is_function(/*changePage*/ ctx[1])) /*changePage*/ ctx[1].apply(this, arguments);
					},
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*pages*/ 1) && t_value !== (t_value = /*pj*/ ctx[4].page + "")) set_data_dev(t, t_value);

			if (!current || dirty & /*state, pages*/ 5 && li_class_value !== (li_class_value = "" + (null_to_empty(/*state*/ ctx[2].currentPage === /*pj*/ ctx[4].page
			? "active"
			: "") + " svelte-juzme9"))) {
				attr_dev(li, "class", li_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;

			add_render_callback(() => {
				if (!li_transition) li_transition = create_bidirectional_transition(li, slide, {}, true);
				li_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			if (!li_transition) li_transition = create_bidirectional_transition(li, slide, {}, false);
			li_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			if (detaching && li_transition) li_transition.end();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(25:3) {#each pages as pj}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let svg;
	let path;
	let path_d_value;
	let t;
	let if_block_anchor;
	let current;
	let mounted;
	let dispose;
	let if_block = /*state*/ ctx[2].showNav && create_if_block(ctx);

	const block = {
		c: function create() {
			div = element("div");
			svg = svg_element("svg");
			path = svg_element("path");
			t = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();

			attr_dev(path, "d", path_d_value = /*state*/ ctx[2].showNav
			? "M10 6 L2 16 10 26 M2 16 L30 16"
			: "M4 8 L28 8 M4 16 L28 16 M4 24 L28 24");

			add_location(path, file, 14, 2, 225);
			attr_dev(svg, "viewBox", "0 0 32 32");
			attr_dev(svg, "width", "32");
			attr_dev(svg, "height", "32");
			attr_dev(svg, "stroke-width", "2");
			add_location(svg, file, 7, 1, 127);
			attr_dev(div, "id", "nav");
			attr_dev(div, "class", "svelte-juzme9");
			add_location(div, file, 6, 0, 111);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, svg);
			append_dev(svg, path);
			insert_dev(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = listen_dev(
					svg,
					"click",
					function () {
						if (is_function(/*navTog*/ ctx[3])) /*navTog*/ ctx[3].apply(this, arguments);
					},
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (!current || dirty & /*state*/ 4 && path_d_value !== (path_d_value = /*state*/ ctx[2].showNav
			? "M10 6 L2 16 10 26 M2 16 L30 16"
			: "M4 8 L28 8 M4 16 L28 16 M4 24 L28 24")) {
				attr_dev(path, "d", path_d_value);
			}

			if (/*state*/ ctx[2].showNav) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*state*/ 4) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (detaching) detach_dev(t);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Nav", slots, []);

	let { pages } = $$props,
		{ changePage } = $$props,
		{ state } = $$props,
		{ navTog } = $$props;

	const writable_props = ["pages", "changePage", "state", "navTog"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nav> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("pages" in $$props) $$invalidate(0, pages = $$props.pages);
		if ("changePage" in $$props) $$invalidate(1, changePage = $$props.changePage);
		if ("state" in $$props) $$invalidate(2, state = $$props.state);
		if ("navTog" in $$props) $$invalidate(3, navTog = $$props.navTog);
	};

	$$self.$capture_state = () => ({ pages, changePage, state, navTog, slide });

	$$self.$inject_state = $$props => {
		if ("pages" in $$props) $$invalidate(0, pages = $$props.pages);
		if ("changePage" in $$props) $$invalidate(1, changePage = $$props.changePage);
		if ("state" in $$props) $$invalidate(2, state = $$props.state);
		if ("navTog" in $$props) $$invalidate(3, navTog = $$props.navTog);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [pages, changePage, state, navTog];
}

class Nav extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance, create_fragment, safe_not_equal, {
			pages: 0,
			changePage: 1,
			state: 2,
			navTog: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Nav",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*pages*/ ctx[0] === undefined && !("pages" in props)) {
			console.warn("<Nav> was created without expected prop 'pages'");
		}

		if (/*changePage*/ ctx[1] === undefined && !("changePage" in props)) {
			console.warn("<Nav> was created without expected prop 'changePage'");
		}

		if (/*state*/ ctx[2] === undefined && !("state" in props)) {
			console.warn("<Nav> was created without expected prop 'state'");
		}

		if (/*navTog*/ ctx[3] === undefined && !("navTog" in props)) {
			console.warn("<Nav> was created without expected prop 'navTog'");
		}
	}

	get pages() {
		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set pages(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get changePage() {
		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set changePage(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get state() {
		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set state(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get navTog() {
		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set navTog(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/home.svelte generated by Svelte v3.30.0 */

const file$1 = "src/components/home.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (52:8) {#each images as img}
function create_each_block$1(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			if (img.src !== (img_src_value = "https://images.unsplash.com/photo-" + /*img*/ ctx[1])) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "");
			attr_dev(img, "class", "svelte-1tljnlb");
			add_location(img, file$1, 52, 12, 2387);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(52:8) {#each images as img}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let section;
	let div0;
	let img;
	let img_src_value;
	let t;
	let div1;
	let each_value = /*images*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			section = element("section");
			div0 = element("div");
			img = element("img");
			t = space();
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (img.src !== (img_src_value = "./assets/logo.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "");
			attr_dev(img, "class", "svelte-1tljnlb");
			add_location(img, file$1, 11, 9, 754);
			add_location(div0, file$1, 11, 4, 749);
			attr_dev(div1, "class", "image-container svelte-1tljnlb");
			add_location(div1, file$1, 50, 4, 2315);
			attr_dev(section, "class", "svelte-1tljnlb");
			add_location(section, file$1, 10, 0, 735);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, section, anchor);
			append_dev(section, div0);
			append_dev(div0, img);
			append_dev(section, t);
			append_dev(section, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*images*/ 1) {
				each_value = /*images*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(section);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Home", slots, []);

	const images = [
		"1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1033&q=80",
		"1419242902214-272b3f66ee7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1087&q=80",
		"1543722530-d2c3201371e7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1053&q=80",
		"1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
		"1419242902214-272b3f66ee7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1087&q=80"
	];

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ images });
	return [images];
}

class Home extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Home",
			options,
			id: create_fragment$1.name
		});
	}
}

/* src/micro/bh.svelte generated by Svelte v3.30.0 */

const file$2 = "src/micro/bh.svelte";

function create_fragment$2(ctx) {
	let div2;
	let div1;
	let div0;

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			attr_dev(div0, "class", "earth__shadow-container svelte-90kt5a");
			add_location(div0, file$2, 39, 8, 869);
			attr_dev(div1, "class", "earth svelte-90kt5a");
			add_location(div1, file$2, 38, 4, 841);
			attr_dev(div2, "class", "wrapper svelte-90kt5a");
			add_location(div2, file$2, 37, 0, 815);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, div0);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Bh", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Bh> was created with unknown prop '${key}'`);
	});

	return [];
}

class Bh extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Bh",
			options,
			id: create_fragment$2.name
		});
	}
}

/* src/components/proj.svelte generated by Svelte v3.30.0 */
const file$3 = "src/components/proj.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	child_ctx[4] = i;
	return child_ctx;
}

// (45:4) {#each data.past as pj, i}
function create_each_block$2(ctx) {
	let div1;
	let img;
	let img_src_value;
	let t0;
	let div0;
	let t1_value = /*pj*/ ctx[2].name + "";
	let t1;
	let t2;

	const block = {
		c: function create() {
			div1 = element("div");
			img = element("img");
			t0 = space();
			div0 = element("div");
			t1 = text(t1_value);
			t2 = space();
			if (img.src !== (img_src_value = /*pj*/ ctx[2].img)) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "");
			attr_dev(img, "class", "svelte-dusztq");
			add_location(img, file$3, 46, 12, 1337);
			attr_dev(div0, "class", "name");
			add_location(div0, file$3, 47, 12, 1377);
			attr_dev(div1, "class", "comet svelte-dusztq");
			add_location(div1, file$3, 45, 8, 1305);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, img);
			append_dev(div1, t0);
			append_dev(div1, div0);
			append_dev(div0, t1);
			append_dev(div1, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*data*/ 1 && img.src !== (img_src_value = /*pj*/ ctx[2].img)) {
				attr_dev(img, "src", img_src_value);
			}

			if (dirty & /*data*/ 1 && t1_value !== (t1_value = /*pj*/ ctx[2].name + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(45:4) {#each data.past as pj, i}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let div1;
	let div0;
	let t0;
	let section;
	let t1;
	let bh;
	let current;
	let each_value = /*data*/ ctx[0].past;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	bh = new Bh({ $$inline: true });

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			t0 = text("\n\nPast Projects\n");
			section = element("section");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			create_component(bh.$$.fragment);
			attr_dev(div0, "class", "space__comet svelte-dusztq");
			add_location(div0, file$3, 21, 4, 531);
			attr_dev(div1, "class", "space__comet-container");
			set_style(div1, "position", "fixed");
			add_location(div1, file$3, 20, 0, 466);
			set_style(section, "overflow-x", "scroll");
			attr_dev(section, "class", "svelte-dusztq");
			add_location(section, file$3, 43, 0, 1229);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			insert_dev(target, t0, anchor);
			insert_dev(target, section, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(section, null);
			}

			insert_dev(target, t1, anchor);
			mount_component(bh, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*data*/ 1) {
				each_value = /*data*/ ctx[0].past;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(section, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(bh.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(bh.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(section);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t1);
			destroy_component(bh, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Proj", slots, []);
	let { data } = $$props;

	const backgrounder = i => {
		const opts = [
			"-20deg,#b71,#fd6",
			"-20deg,#1a9,#4f8",
			"0deg,#028,#07e",
			"0deg,#444,#000",
			"0deg,#46f,#f47"
		];

		const bg = "linear-gradient(" + opts[Math.round(Math.random() * (opts.length - 1))] + ")";
		return bg;
	};

	const writable_props = ["data"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Proj> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("data" in $$props) $$invalidate(0, data = $$props.data);
	};

	$$self.$capture_state = () => ({ data, BH: Bh, backgrounder });

	$$self.$inject_state = $$props => {
		if ("data" in $$props) $$invalidate(0, data = $$props.data);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [data];
}

class Proj extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { data: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Proj",
			options,
			id: create_fragment$3.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*data*/ ctx[0] === undefined && !("data" in props)) {
			console.warn("<Proj> was created without expected prop 'data'");
		}
	}

	get data() {
		throw new Error("<Proj>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<Proj>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var going = [
	{
		name: "EINSat",
		icon: "https://pbs.twimg.com/media/ETVfqtTX0AAdrtd.jpg",
		desc: "EINSat - The CubeSat project of SEDS-Celestia is the first CubeSat undertaking in BITS Pilani K.K. Birla Goa campus.The current team for the project consists of 13 members spanned across 6 subsystems.",
		main: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4a8b89eb-212e-48ac-b1d8-0554cbe12ff1/d6gmgh6-541b78b7-6f78-4676-a960-187c12f7575d.jpg/v1/fill/w_622,h_350,q_70,strp/ssv_normandy_sr2__chariot_of_the_gods_by_eddy_shinjuku_d6gmgh6-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xNDQwIiwicGF0aCI6IlwvZlwvNGE4Yjg5ZWItMjEyZS00OGFjLWIxZDgtMDU1NGNiZTEyZmYxXC9kNmdtZ2g2LTU0MWI3OGI3LTZmNzgtNDY3Ni1hOTYwLTE4N2MxMmY3NTc1ZC5qcGciLCJ3aWR0aCI6Ijw9MjU2MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.UibCiAXSMF-wv7Hp4GA_N-cjCq0UqQqtz9M6QbDyr4A",
		more: "Github",
		moreLink: "https://me.nukes.in"
	},
	{
		name: "Rocketry",
		icon: "https://i.imgur.com/eum16Uw.jpg",
		desc: "Rocketry aims to build a thrust-vector controlled rocket (as of now).Thrust vector control allows a rocket to stay pointed towards a pre specified path, allowing better performance and range than a sounding rocket.Future plans include self landing model rockets,",
		main: "https://i.pinimg.com/originals/9b/01/d0/9b01d0fcc29dd6b04e3a9619e6def219.png",
		more: "500px",
		moreLink: "https://me.nukes.in"
	},
	{
		name: "Quantum Chess",
		icon: "https://c4.wallpaperflare.com/wallpaper/627/677/142/shiro-no-game-no-life-sora-no-game-no-life-stephanie-dora-blue-hair-wallpaper-thumb.jpg",
		desc: "Quantum chess is built on the same rules as classical chess, with a few additional functionalities that make the pieces can be a superposition - in two places at the same time…~quantum~ (cue “ooooooooh”)....or entangled - where measuring one piece determines the position of not just the piece itself, but another one too!",
		main: "https://images7.alphacoders.com/740/thumb-1920-740377.png",
		more: "GitHub",
		moreLink: "https://me.nukes.in"
	},
	{
		name: "Brain Computer Interface",
		icon: "https://c4.wallpaperflare.com/wallpaper/627/677/142/shiro-no-game-no-life-sora-no-game-no-life-stephanie-dora-blue-hair-wallpaper-thumb.jpg",
		desc: "We are trying to design an interface that translates electrical signals from brain to digital signals that computer understands. The computer then converts these signals to machine commands that controls an output device. In our case, a simple rover with allowed motion in all 4 direction.",
		main: "https://images7.alphacoders.com/740/thumb-1920-740377.png",
		more: "GitHub",
		moreLink: "https://me.nukes.in"
	},
	{
		name: "Binary Calculator",
		icon: "https://c4.wallpaperflare.com/wallpaper/627/677/142/shiro-no-game-no-life-sora-no-game-no-life-stephanie-dora-blue-hair-wallpaper-thumb.jpg",
		desc: "The project focuses on highlighting how calculations are done at the most basic level possible. The primary aim will be do develop a 4 bit adder circuit using transistors as the building blocks. Possibly, we may even put in a subtractor circuit as an add-on to the current plan, if time permits.",
		main: "https://images7.alphacoders.com/740/thumb-1920-740377.png",
		more: "GitHub",
		moreLink: "https://me.nukes.in"
	},
	{
		name: "Cloud Chamber",
		icon: "https://c4.wallpaperflare.com/wallpaper/627/677/142/shiro-no-game-no-life-sora-no-game-no-life-stephanie-dora-blue-hair-wallpaper-thumb.jpg",
		desc: "We plan to design a cloud chamber to do old school physics.A cloud chamber, also known as a Wilson cloud chamber, is a particle detector used for visualizing the passage of ionizing radiation. A cloud chamber consists of a sealed environment containing a supersaturated vapor of water or alcohol",
		main: "https://images7.alphacoders.com/740/thumb-1920-740377.png",
		more: "GitHub",
		moreLink: "https://me.nukes.in"
	},
	{
		name: "Comet Dust Trail Simulation",
		icon: "https://c4.wallpaperflare.com/wallpaper/627/677/142/shiro-no-game-no-life-sora-no-game-no-life-stephanie-dora-blue-hair-wallpaper-thumb.jpg",
		desc: "Comet trails are created when the ice from the surface of a comet turns into gas and escapes, dragging along with it dust particles which make it seem like contrails behind an airplanes. We plan to simulate these dust trails.",
		main: "https://images7.alphacoders.com/740/thumb-1920-740377.png",
		more: "GitHub",
		moreLink: "https://me.nukes.in"
	}
];
var past = [
	{
		year: "2019",
		name: "CanSat",
		desc: "This project aims to design a small cansat. A CanSat is a type of sounding rocket payload used to teach space technology. It is similar to the technology used in miniaturized satellites. No CanSat has ever left the atmosphere, nor orbited the earth.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "2019",
		name: "StarTracker",
		desc: "We had planned to build a computerized telescope Sky Tracker.Configured to Stellarium, the software will show the point aimed in sky on computer screen and track them.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "2019",
		name: "Lidar",
		desc: "Light Detection and Ranging (LiDAR) is a new concept closely related to RADAR and SONAR used to detect objects at a distance, but with the benefits of having better frequency and precision. It is an optical remote sensing system which can measure the distance and position of a target by illuminating the target with light and measuring the reflected light with a sensor. Due to its accurate results, it has great applications in terrain mapping, vehicle automation and obstacle detection and deflection.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "2019",
		name: "Tesla Coil",
		desc: "The objective of this project was to create a Solid State Tesla Coil: a Tesla Coil powered by Transistors instead of a spark gap. The design and construction of a SSTC is not a trivial task. It’s main challenge lies with the fact that to perfect the circuit, a lot of debugging is required for which a very sound knowledge of electronics is important.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "2019",
		name: "Microbial Fuel Cell",
		desc: "Microbial fuel cells are devices that utilize bacteria in order to catalize reactions and generate current. Microbial fuel cells(MFC) are most commonly used as cells in order to generate current and as a cleaner method of energy generation. The project had proceedeed by selecting the design and structure of the fuel cell and then by the selection of the electrolyte, proton exchange membrane and the anode and cathode material required",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "2019",
		name: "Pyroboard",
		desc: "A Rubens’ tube, also known as a standing wave flame tube, or simply flame tube, is an antique physics apparatus for demonstrating acoustic standing waves in a tube. A flammable gas is passed through a drilled tube and the gas is vibrated using a speaker. We can see the standing waves produced by the input sound in the form of flames coming out of the drilled holes. A 2D version of a Ruben’s tube is called a Ruben’s board or simply, Pyro Board.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "2019",
		name: "Spectrometer",
		desc: "An optical spectrometer is a scientific instrument used to analyse the electromagnetic spectrum of physical phenomena. It is a powerful way to determine the chemical composition of light sources or illuminated objects.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "2019",
		name: "Physarum",
		desc: "Physarum polycephalum is a slime mold. It has been observed that this mold can solve some basic computational problems like the shortest path problem. It even exhibits a very primitive form of memory. As the mold does not have a nervous system, scientists have been fascinated by its’ behavior.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "2019",
		name: "Sonoluminescence",
		desc: "t’s one of the long term projects, that aims to create a sonoluminescent bubble and take temperature and spectral measurements of the light emitted. ‘Sono’ means sound and ‘luminescent’ pertains to light. It is an air bubble in a fluid that emits visible light, due to high amplitude ultrasonic waves passing through it. It is an incredibly rare and unexplored phenomenon.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "",
		name: "Barn Door Tracker",
		desc: "The project aimed to build an automated mount on which a DSLR camera can be put up and take a wide scope, long exposure images of night’s sky.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "",
		name: "N-body simulation",
		desc: "It aimed to simulate the gravitational interaction of a swarm of bodies and study the clustering and dynamics of the structures formed.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "",
		name: "Schlieren Photography",
		desc: "It aimed for the visualization of pressure, temperature and composition gradients in fluid flow and observe the complex fractal like structures of turbulence.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "",
		name: "Reproduction of particle interference with walking droplets",
		desc: "It aimed to recreate a quantum phenomena like interference with walking droplets on a vibrating fluid bed.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "",
		name: "Galaxy Classifier Neural Net",
		desc: "It aimed to build and train a convolutional neural network that will classify galaxies using their images.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	},
	{
		year: "",
		name: "Michelson Interferometers",
		desc: "It aimed to build a Michelson interferometer without any expensive equipment and to explore the applications of interferometry in seismology and acoustics.",
		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
		more: "",
		moreLink: ""
	}
];
var prjs = {
	going: going,
	past: past
};

var team = {
	mgmt: [
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Hrutwick Sawant",
			pos: "President"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Harshvardhan C.",
			pos: "Vice President"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Paurush Punyasheel",
			pos: "Secretary"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Ankit Verma",
			pos: "Head of Projects"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Bhuvan S V",
			pos: "Head of Lectures"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Murudkar Kaustubh",
			pos: "Head of Observations"
		}
	],
	leads: [
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "3 Sided Coin",
			pos: "Neil Shah"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Quantum Chess",
			pos: "Ayushi Dubal"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Einsat",
			pos: "Ankit Verma"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Cloud Chamber",
			pos: "Vivek S."
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Binary Calculator",
			pos: "Yash Pathak"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "CanSat",
			pos: "Dhruv Patidar"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Star Tracker",
			pos: "Koi to Tha"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Comet Trail Sim",
			pos: "Yashee Sinha"
		},
		{
			img: "https://pbs.twimg.com/profile_images/1162996912531730433/b08m-caG_400x400.jpg",
			name: "Rocketry",
			pos: "Venugopalan Iyenger"
		}
	]
};
var facilities = {
	upcoming: {
		playlist: "https://www.youtube.com/playlist?list=PLGzI_TnIg-ep9iPfxMjstY6L9l4xGmqKa",
		img: "/assets/images/lectures.png",
		title: "OPEN LECTURES",
		details: "Various people including professors from reputable universities and even our own club members give lectures. Paper presentation is a new venture we have undertaken. People select a paper and present it to the club members, and a discussion on the paper is followed."
	},
	telescopes: [
		{
			title: "Celestron Powerseeker 127EQ",
			img: "/assets/images/celestron.jpg",
			star: "f/7.87",
			range: "18x - 300x"
		},
		{
			title: "Sky-Watcher Dobsonian 8\" Traditional",
			img: "/assets/images/dobbynew.jpeg",
			star: "f/5.9",
			range: "1x - 409x"
		},
		{
			title: "Sky-Watcher Dobsonian 6\" Traditional",
			img: "/assets/images/dobbyold.jpeg",
			star: "f/7.8",
			range: "1x - 306x"
		}
	],
	opensource: [
		{
			img: "/assets/images/qc.png",
			title: "Quantum chess",
			repo: "https://github.com/SEDSCelestiaBPGC/quantum-chess"
		},
		{
			show: -1,
			img: "https://images.immediate.co.uk/production/volatile/sites/25/2019/02/Baader-Nano-Tracker-Travelling-Mount-Baader-Nano-Tracker-Travelling-Mount-5d5a2f4.jpg?quality=90&resize=620,413",
			title: "3- Sided Coin",
			repo: ""
		},
		{
			img: "/assets/images/bci.png",
			title: "Brain Computer Interface",
			repo: "https://github.com/SEDSCelestiaBPGC/BCI"
		},
		{
			show: -1,
			img: "/assets/svgs/korolev.svg",
			title: "Celestia-Korolev Website (Soon)",
			repo: "https://github.com/SEDSCelestiaBPGC/BCI"
		}
	],
	podcast: [
		{
			icon: "/assets/svgs/youtube.svg",
			link: "https://www.youtube.com/playlist?list=PLGzI_TnIg-eqKRfQTB4wxVFGOnarP3jFJ"
		},
		{
			icon: "/assets/svgs/spotify.svg",
			link: "https://open.spotify.com/show/0NKbVLI7LpY6069IUCF6xi"
		},
		{
			icon: "/assets/svgs/radiopublic.svg",
			link: "https://radiopublic.com/celestia-onair-WeRp1J"
		},
		{
			icon: "/assets/svgs/google.svg",
			link: "https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy80NWYzZjAwOC9wb2RjYXN0L3Jzcw=="
		},
		{
			icon: "/assets/svgs/pocketcast.svg",
			link: "https://pca.st/b3mqu7bk"
		},
		{
			icon: "/assets/svgs/breaker.png",
			link: "https://www.breaker.audio/celestia-on-air"
		}
	]
};
var education = {
	books: [
		{
			name: "Brief History of Time",
			image: "cdn.waterstones.com/bookjackets/large/9780/8575/9780857501004.jpg",
			link: "To AMAZON"
		},
		{
			name: "Astrophysics for People in a Hurry",
			image: "images-na.ssl-images-amazon.com/images/I/91w70Ax2LhL.jpg",
			link: "To AMAZON"
		},
		{
			name: "Einstien for Everyone",
			image: "images-na.ssl-images-amazon.com/images/I/915UE-Nq-TL.jpg",
			link: "To AMAZON"
		},
		{
			name: "Accessory to War NDT",
			image: "images-na.ssl-images-amazon.com/images/I/81Wed-PV19L.jpg",
			link: "To AMAZON"
		},
		{
			name: "Principia Mathematica",
			image: "upload.wikimedia.org/wikipedia/commons/1/17/Prinicipia-title.png",
			link: "To AMAZON"
		},
		{
			name: "Cosmic Connection",
			image: "upload.wikimedia.org/wikipedia/en/4/4d/The_Cosmic_Connection_%28book%29.jpg",
			link: "To AMAZON"
		},
		{
			name: "GEB EGB",
			image: "images-na.ssl-images-amazon.com/images/I/61x9qySMjzL.jpg",
			link: "To AMAZON"
		},
		{
			name: "6 Easy Pieces",
			image: "images-na.ssl-images-amazon.com/images/I/513pj3ro+jL._SX312_BO1,204,203,200_.jpg",
			link: "To AMAZON"
		}
	],
	yt: [
		{
			name: "StarTalk",
			image: "yt3.ggpht.com/ytc/AAUvwnjjP7Q74FjwiybZTMoamnZIq9t_7ZeCURh0xK1I-cY=s88-c-k-c0x00ffffff-no-rj",
			channel: "https://www.youtube.com/channel/UCqoAEDirJPjEUFcF2FklnBA"
		},
		{
			name: "SpaceX",
			image: "yt3.ggpht.com/ytc/AAUvwnifgXHHC6YlnrDKnrMWk23FKLfLYJdSb8Odj1KQ6uI=s88-c-k-c0x00ffffff-no-rj",
			channel: "https://www.youtube.com/channel/UCtI0Hodo5o5dUb67FeUjDeA"
		},
		{
			name: "MinutePhysics",
			image: "yt3.ggpht.com/ytc/AAUvwnhz4WmHt4YZriL-WHqEGS-5nf2QY0V5vaTTMFpW=s88-c-k-c0x00ffffff-no-rj",
			channel: "https://www.youtube.com/channel/UCUHW94eEFW7hkUMVaZz4eDg"
		}
	]
};
var frontier = {
};
var data = {
	team: team,
	facilities: facilities,
	education: education,
	frontier: frontier
};

/* src/App.svelte generated by Svelte v3.30.0 */

// (44:0) {:else}
function create_else_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = Home;

	function switch_props(ctx) {
		return {
			props: { data: data.home },
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (switch_value !== (switch_value = Home)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(44:0) {:else}",
		ctx
	});

	return block;
}

// (42:42) 
function create_if_block_2(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = Proj;

	function switch_props(ctx) {
		return { props: { data: prjs }, $$inline: true };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (switch_value !== (switch_value = Proj)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(42:42) ",
		ctx
	});

	return block;
}

// (40:44) 
function create_if_block_1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*Facc*/ ctx[2];

	function switch_props(ctx) {
		return {
			props: { data: data.facilities },
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (switch_value !== (switch_value = /*Facc*/ ctx[2])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(40:44) ",
		ctx
	});

	return block;
}

// (38:0) {#if state.currentPage == "Team"}
function create_if_block$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*Team*/ ctx[1];

	function switch_props(ctx) {
		return {
			props: { data: data.team },
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (switch_value !== (switch_value = /*Team*/ ctx[1])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(38:0) {#if state.currentPage == \\\"Team\\\"}",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let nav;
	let t;
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;

	nav = new Nav({
			props: {
				pages: /*pages*/ ctx[5],
				state: /*state*/ ctx[0],
				changePage: /*changePage*/ ctx[4],
				navTog: /*navTog*/ ctx[3]
			},
			$$inline: true
		});

	const if_block_creators = [create_if_block$1, create_if_block_1, create_if_block_2, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*state*/ ctx[0].currentPage == "Team") return 0;
		if (/*state*/ ctx[0].currentPage == "Facilities") return 1;
		if (/*state*/ ctx[0].currentPage == "Projects") return 2;
		return 3;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			create_component(nav.$$.fragment);
			t = space();
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(nav, target, anchor);
			insert_dev(target, t, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const nav_changes = {};
			if (dirty & /*state*/ 1) nav_changes.state = /*state*/ ctx[0];
			nav.$set(nav_changes);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(nav.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(nav.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(nav, detaching);
			if (detaching) detach_dev(t);
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("App", slots, []);

	let Team,
		// Proj,
		Facc;

	const navTog = () => $$invalidate(0, state.showNav = !state.showNav, state);

	// onMount(() => {
	// 	import("./components/team.svelte").then((r) => (Team = r.default));
	// 	import("./components/facc.svelte").then((r) => (Facc = r.default));
	// 	import("./components/proj.svelte").then((r) => (Proj = r.default));
	// });
	const changePage = e => {
		navTog();
		$$invalidate(0, state.currentPage = e.target.innerText, state);
	};

	const pages = [
		{ page: "Home", component: Home },
		{ page: "Team", component: Team },
		{ page: "Facilities", component: Facc },
		{ page: "Projects", component: Proj }
	];

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		Nav,
		Home,
		Proj,
		prjs,
		data,
		onMount,
		Team,
		Facc,
		navTog,
		changePage,
		pages,
		state
	});

	$$self.$inject_state = $$props => {
		if ("Team" in $$props) $$invalidate(1, Team = $$props.Team);
		if ("Facc" in $$props) $$invalidate(2, Facc = $$props.Facc);
		if ("state" in $$props) $$invalidate(0, state = $$props.state);
	};

	let state;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	 $$invalidate(0, state = { showNav: 0, currentPage: "Projects" });
	return [state, Team, Facc, navTog, changePage, pages];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment$4.name
		});
	}
}

var main = new App( { target: document.getElementsByTagName( 'main' )[ 0 ] } );

export default main;
