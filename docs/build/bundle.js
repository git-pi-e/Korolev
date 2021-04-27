
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var file = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
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
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
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
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function xlink_attr(node, attribute, value) {
        node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
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

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
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
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
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

    /* src/micro/nav.svelte generated by Svelte v3.30.0 */

    const file = "src/micro/nav.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (67:4) {#each pages as pj, i}
    function create_each_block(ctx) {
    	let li;
    	let input;
    	let input_value_value;
    	let input_checked_value;
    	let t0;
    	let label;
    	let t1_value = /*pj*/ ctx[3].page + "";
    	let t1;
    	let label_for_value;

    	const block = {
    		c: function create() {
    			li = element("li");
    			input = element("input");
    			t0 = space();
    			label = element("label");
    			t1 = text(t1_value);
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "name", "navigator");
    			attr_dev(input, "class", "w-100 svelte-fem7qm");
    			input.value = input_value_value = /*pj*/ ctx[3].page;
    			input.checked = input_checked_value = /*currentPage*/ ctx[2] === /*pj*/ ctx[3].page ? 1 : 0;
    			add_location(input, file, 68, 8, 1597);
    			attr_dev(label, "for", label_for_value = /*pj*/ ctx[3].page);
    			attr_dev(label, "class", "svelte-fem7qm");
    			add_location(label, file, 74, 8, 1767);
    			set_style(li, "animation-delay", /*i*/ ctx[5] / 20 + "s");
    			attr_dev(li, "class", "svelte-fem7qm");
    			add_location(li, file, 67, 6, 1550);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, input);
    			append_dev(li, t0);
    			append_dev(li, label);
    			append_dev(label, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pages*/ 1 && input_value_value !== (input_value_value = /*pj*/ ctx[3].page)) {
    				prop_dev(input, "value", input_value_value);
    			}

    			if (dirty & /*currentPage, pages*/ 5 && input_checked_value !== (input_checked_value = /*currentPage*/ ctx[2] === /*pj*/ ctx[3].page ? 1 : 0)) {
    				prop_dev(input, "checked", input_checked_value);
    			}

    			if (dirty & /*pages*/ 1 && t1_value !== (t1_value = /*pj*/ ctx[3].page + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*pages*/ 1 && label_for_value !== (label_for_value = /*pj*/ ctx[3].page)) {
    				attr_dev(label, "for", label_for_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(67:4) {#each pages as pj, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let details;
    	let summary;
    	let t0;
    	let ul;
    	let t1;
    	let li0;
    	let input0;
    	let t2;
    	let label0;
    	let t4;
    	let li1;
    	let input1;
    	let t5;
    	let label1;
    	let mounted;
    	let dispose;
    	let each_value = /*pages*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			details = element("details");
    			summary = element("summary");
    			t0 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			li0 = element("li");
    			input0 = element("input");
    			t2 = space();
    			label0 = element("label");
    			label0.textContent = "Education";
    			t4 = space();
    			li1 = element("li");
    			input1 = element("input");
    			t5 = space();
    			label1 = element("label");
    			label1.textContent = "Blog";
    			attr_dev(summary, "class", "po-rel svelte-fem7qm");
    			set_style(summary, "z-index", "9999");
    			add_location(summary, file, 64, 2, 1403);
    			attr_dev(input0, "type", "radio");
    			attr_dev(input0, "name", "navigator");
    			input0.value = "Education";
    			attr_dev(input0, "class", "svelte-fem7qm");
    			add_location(input0, file, 80, 6, 1947);
    			attr_dev(label0, "for", "Education");
    			attr_dev(label0, "class", "svelte-fem7qm");
    			add_location(label0, file, 81, 6, 2011);
    			set_style(li0, "animation-delay", "0.2s");
    			attr_dev(li0, "onclick", "window.location.href='http://edu.sedscelestia.org'");
    			attr_dev(li0, "class", "svelte-fem7qm");
    			add_location(li0, file, 77, 4, 1834);
    			attr_dev(input1, "type", "radio");
    			attr_dev(input1, "name", "navigator");
    			input1.value = "Blog";
    			attr_dev(input1, "class", "svelte-fem7qm");
    			add_location(input1, file, 86, 6, 2181);
    			attr_dev(label1, "for", "Blog");
    			attr_dev(label1, "class", "svelte-fem7qm");
    			add_location(label1, file, 87, 6, 2240);
    			set_style(li1, "animation-delay", "0.25s");
    			attr_dev(li1, "onclick", "window.location.href='http://blog.sedscelestia.org'");
    			attr_dev(li1, "class", "svelte-fem7qm");
    			add_location(li1, file, 83, 4, 2066);
    			attr_dev(ul, "class", "blur w-100 h-100 tx-c po-fix svelte-fem7qm");
    			add_location(ul, file, 65, 2, 1453);
    			attr_dev(details, "id", "nav");
    			attr_dev(details, "class", "po-stx z-5 svelte-fem7qm");
    			add_location(details, file, 63, 0, 1363);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, details, anchor);
    			append_dev(details, summary);
    			append_dev(details, t0);
    			append_dev(details, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(ul, t1);
    			append_dev(ul, li0);
    			append_dev(li0, input0);
    			append_dev(li0, t2);
    			append_dev(li0, label0);
    			append_dev(ul, t4);
    			append_dev(ul, li1);
    			append_dev(li1, input1);
    			append_dev(li1, t5);
    			append_dev(li1, label1);

    			if (!mounted) {
    				dispose = listen_dev(
    					ul,
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
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (dirty & /*pages, currentPage*/ 5) {
    				each_value = /*pages*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, t1);
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
    			if (detaching) detach_dev(details);
    			destroy_each(each_blocks, detaching);
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
    	let { pages } = $$props, { changePage } = $$props, { currentPage } = $$props;
    	const writable_props = ["pages", "changePage", "currentPage"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("pages" in $$props) $$invalidate(0, pages = $$props.pages);
    		if ("changePage" in $$props) $$invalidate(1, changePage = $$props.changePage);
    		if ("currentPage" in $$props) $$invalidate(2, currentPage = $$props.currentPage);
    	};

    	$$self.$capture_state = () => ({ pages, changePage, currentPage });

    	$$self.$inject_state = $$props => {
    		if ("pages" in $$props) $$invalidate(0, pages = $$props.pages);
    		if ("changePage" in $$props) $$invalidate(1, changePage = $$props.changePage);
    		if ("currentPage" in $$props) $$invalidate(2, currentPage = $$props.currentPage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pages, changePage, currentPage];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { pages: 0, changePage: 1, currentPage: 2 });

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

    		if (/*currentPage*/ ctx[2] === undefined && !("currentPage" in props)) {
    			console.warn("<Nav> was created without expected prop 'currentPage'");
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

    	get currentPage() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentPage(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var miles = [
    	{
    		year: 2009,
    		event: "Founded"
    	},
    	{
    		year: 2015,
    		event: "Affiliated to SEDS"
    	},
    	{
    		year: 2016,
    		event: "Founded Apeiro"
    	},
    	{
    		year: 2017,
    		event: "Project RT Starts"
    	},
    	{
    		year: 2018,
    		event: "Project Kratos Starts"
    	}
    ];
    var data = {
    	miles: miles
    };

    /* src/nano/logo.svelte generated by Svelte v3.30.0 */

    const file$1 = "src/nano/logo.svelte";

    function create_fragment$1(ctx) {
    	let svg;
    	let style;
    	let t0;
    	let defs;
    	let circle0;
    	let clipPath;
    	let use;
    	let circle1;
    	let g;
    	let circle2;
    	let text0;
    	let t1;
    	let circle3;
    	let text1;
    	let t2;
    	let svg_width_value;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			style = svg_element("style");
    			t0 = text("circle {\n      stroke: #fff;\n    }\n  ");
    			defs = svg_element("defs");
    			circle0 = svg_element("circle");
    			clipPath = svg_element("clipPath");
    			use = svg_element("use");
    			circle1 = svg_element("circle");
    			g = svg_element("g");
    			circle2 = svg_element("circle");
    			text0 = svg_element("text");
    			t1 = text("SEDS");
    			circle3 = svg_element("circle");
    			text1 = svg_element("text");
    			t2 = text("CELESTIA");
    			add_location(style, file$1, 8, 26, 136);
    			attr_dev(circle0, "id", "m");
    			attr_dev(circle0, "cx", "256");
    			attr_dev(circle0, "cy", "256");
    			attr_dev(circle0, "r", "248");
    			attr_dev(circle0, "stroke-width", "8");
    			attr_dev(circle0, "fill", "#0000");
    			add_location(circle0, file$1, 14, 4, 207);
    			xlink_attr(use, "xlink:href", "#m");
    			add_location(use, file$1, 16, 6, 315);
    			attr_dev(clipPath, "id", "eclipse");
    			add_location(clipPath, file$1, 15, 4, 285);
    			add_location(defs, file$1, 13, 2, 196);
    			attr_dev(circle1, "cx", "256");
    			attr_dev(circle1, "cy", "256");
    			attr_dev(circle1, "r", "248");
    			attr_dev(circle1, "stroke-width", "32");
    			attr_dev(circle1, "fill", "#0000");
    			add_location(circle1, file$1, 20, 2, 427);
    			attr_dev(circle2, "cx", "420");
    			attr_dev(circle2, "cy", "256");
    			attr_dev(circle2, "r", "300");
    			attr_dev(circle2, "fill", "#fff");
    			add_location(circle2, file$1, 22, 4, 531);
    			attr_dev(text0, "y", "290");
    			attr_dev(text0, "x", "160");
    			attr_dev(text0, "fill", "#000");
    			add_location(text0, file$1, 23, 4, 584);
    			attr_dev(g, "clip-path", "url(#eclipse)");
    			add_location(g, file$1, 21, 2, 497);
    			attr_dev(circle3, "cx", "512");
    			attr_dev(circle3, "cy", "256");
    			attr_dev(circle3, "r", "64");
    			attr_dev(circle3, "fill", "#fff");
    			set_style(circle3, "mix-blend-mode", "difference");
    			add_location(circle3, file$1, 25, 2, 639);
    			attr_dev(text1, "y", "290");
    			attr_dev(text1, "x", "595");
    			attr_dev(text1, "fill", "#fff");
    			add_location(text1, file$1, 31, 2, 745);
    			attr_dev(svg, "viewBox", "-6 -8 1096 528");
    			attr_dev(svg, "width", svg_width_value = "" + (/*wd*/ ctx[0] + "px"));
    			attr_dev(svg, "font-size", "100");
    			attr_dev(svg, "font-family", "Helvetica");
    			add_location(svg, file$1, 4, 0, 43);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, style);
    			append_dev(style, t0);
    			append_dev(svg, defs);
    			append_dev(defs, circle0);
    			append_dev(defs, clipPath);
    			append_dev(clipPath, use);
    			append_dev(svg, circle1);
    			append_dev(svg, g);
    			append_dev(g, circle2);
    			append_dev(g, text0);
    			append_dev(text0, t1);
    			append_dev(svg, circle3);
    			append_dev(svg, text1);
    			append_dev(text1, t2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*wd*/ 1 && svg_width_value !== (svg_width_value = "" + (/*wd*/ ctx[0] + "px"))) {
    				attr_dev(svg, "width", svg_width_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
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
    	validate_slots("Logo", slots, []);
    	let { wd = 128 } = $$props;
    	const writable_props = ["wd"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Logo> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("wd" in $$props) $$invalidate(0, wd = $$props.wd);
    	};

    	$$self.$capture_state = () => ({ wd });

    	$$self.$inject_state = $$props => {
    		if ("wd" in $$props) $$invalidate(0, wd = $$props.wd);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [wd];
    }

    class Logo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { wd: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Logo",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get wd() {
    		throw new Error("<Logo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wd(value) {
    		throw new Error("<Logo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/shared/Containr.svelte generated by Svelte v3.30.0 */

    const file$2 = "src/shared/Containr.svelte";
    const get_body_slot_changes = dirty => ({});
    const get_body_slot_context = ctx => ({});

    // (11:4) {#if icon !== 'null'}
    function create_if_block(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "size", "ic");
    			set_style(img, "object-fit", "contain");
    			if (img.src !== (img_src_value = "./assets/icons/" + /*icon*/ ctx[1] + ".svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$2, 11, 6, 217);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*icon*/ 2 && img.src !== (img_src_value = "./assets/icons/" + /*icon*/ ctx[1] + ".svg")) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(11:4) {#if icon !== 'null'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let article;
    	let div;
    	let span;
    	let t0;
    	let t1;
    	let t2;
    	let article_class_value;
    	let current;
    	let if_block = /*icon*/ ctx[1] !== "null" && create_if_block(ctx);
    	const body_slot_template = /*#slots*/ ctx[5].body;
    	const body_slot = create_slot(body_slot_template, ctx, /*$$scope*/ ctx[4], get_body_slot_context);

    	const block = {
    		c: function create() {
    			article = element("article");
    			div = element("div");
    			span = element("span");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			if (body_slot) body_slot.c();
    			add_location(span, file$2, 9, 4, 162);
    			attr_dev(div, "class", "l1 p-10 flex f-wt5");
    			add_location(div, file$2, 8, 2, 125);
    			attr_dev(article, "class", article_class_value = "p-10 m-h-auto " + /*classes*/ ctx[3]);
    			attr_dev(article, "bg", /*bg*/ ctx[2]);
    			add_location(article, file$2, 7, 0, 76);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, div);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);
    			if (if_block) if_block.m(div, null);
    			append_dev(article, t2);

    			if (body_slot) {
    				body_slot.m(article, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

    			if (/*icon*/ ctx[1] !== "null") {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (body_slot) {
    				if (body_slot.p && dirty & /*$$scope*/ 16) {
    					update_slot(body_slot, body_slot_template, ctx, /*$$scope*/ ctx[4], dirty, get_body_slot_changes, get_body_slot_context);
    				}
    			}

    			if (!current || dirty & /*classes*/ 8 && article_class_value !== (article_class_value = "p-10 m-h-auto " + /*classes*/ ctx[3])) {
    				attr_dev(article, "class", article_class_value);
    			}

    			if (!current || dirty & /*bg*/ 4) {
    				attr_dev(article, "bg", /*bg*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(body_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(body_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			if (if_block) if_block.d();
    			if (body_slot) body_slot.d(detaching);
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

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Containr", slots, ['body']);

    	let { title } = $$props,
    		{ icon } = $$props,
    		{ bg } = $$props,
    		{ classes = "" } = $$props;

    	const writable_props = ["title", "icon", "bg", "classes"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Containr> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    		if ("icon" in $$props) $$invalidate(1, icon = $$props.icon);
    		if ("bg" in $$props) $$invalidate(2, bg = $$props.bg);
    		if ("classes" in $$props) $$invalidate(3, classes = $$props.classes);
    		if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ title, icon, bg, classes });

    	$$self.$inject_state = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    		if ("icon" in $$props) $$invalidate(1, icon = $$props.icon);
    		if ("bg" in $$props) $$invalidate(2, bg = $$props.bg);
    		if ("classes" in $$props) $$invalidate(3, classes = $$props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, icon, bg, classes, $$scope, slots];
    }

    class Containr extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { title: 0, icon: 1, bg: 2, classes: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Containr",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
    			console.warn("<Containr> was created without expected prop 'title'");
    		}

    		if (/*icon*/ ctx[1] === undefined && !("icon" in props)) {
    			console.warn("<Containr> was created without expected prop 'icon'");
    		}

    		if (/*bg*/ ctx[2] === undefined && !("bg" in props)) {
    			console.warn("<Containr> was created without expected prop 'bg'");
    		}
    	}

    	get title() {
    		throw new Error("<Containr>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Containr>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<Containr>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Containr>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bg() {
    		throw new Error("<Containr>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bg(value) {
    		throw new Error("<Containr>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classes() {
    		throw new Error("<Containr>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classes(value) {
    		throw new Error("<Containr>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/micro/rocket.svelte generated by Svelte v3.30.0 */

    const file$3 = "src/micro/rocket.svelte";

    function create_fragment$3(ctx) {
    	let div18;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div15;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let div0;
    	let t2;
    	let div1;
    	let t3;
    	let div2;
    	let t4;
    	let div3;
    	let t5;
    	let div4;
    	let p;
    	let t7;
    	let div5;
    	let t8;
    	let div8;
    	let div7;
    	let div6;
    	let t9;
    	let div9;
    	let t10;
    	let div10;
    	let t11;
    	let div11;
    	let t12;
    	let div12;
    	let t13;
    	let div13;
    	let t14;
    	let div14;
    	let t15;
    	let div16;
    	let t16;
    	let div17;

    	const block = {
    		c: function create() {
    			div18 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div15 = element("div");
    			img1 = element("img");
    			t1 = space();
    			div0 = element("div");
    			t2 = space();
    			div1 = element("div");
    			t3 = space();
    			div2 = element("div");
    			t4 = space();
    			div3 = element("div");
    			t5 = space();
    			div4 = element("div");
    			p = element("p");
    			p.textContent = "CELESTIA";
    			t7 = space();
    			div5 = element("div");
    			t8 = space();
    			div8 = element("div");
    			div7 = element("div");
    			div6 = element("div");
    			t9 = space();
    			div9 = element("div");
    			t10 = space();
    			div10 = element("div");
    			t11 = space();
    			div11 = element("div");
    			t12 = space();
    			div12 = element("div");
    			t13 = space();
    			div13 = element("div");
    			t14 = space();
    			div14 = element("div");
    			t15 = space();
    			div16 = element("div");
    			t16 = space();
    			div17 = element("div");
    			if (img0.src !== (img0_src_value = "./assets/legacy.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "class", "po-abs legacy svelte-12zap3l");
    			attr_dev(img0, "size", "max");
    			attr_dev(img0, "alt", "Legacy");
    			add_location(img0, file$3, 225, 2, 6789);
    			attr_dev(img1, "class", "us rx-50 m-7 svelte-12zap3l");
    			if (img1.src !== (img1_src_value = "./assets/logo-sq.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "size", "min");
    			attr_dev(img1, "bg", "000");
    			attr_dev(img1, "alt", "Mini Logo");
    			add_location(img1, file$3, 231, 4, 6914);
    			attr_dev(div0, "class", "ganch ganch_1 svelte-12zap3l");
    			add_location(div0, file$3, 237, 4, 7040);
    			attr_dev(div1, "class", "ganch ganch_2 svelte-12zap3l");
    			add_location(div1, file$3, 238, 4, 7074);
    			attr_dev(div2, "class", "ganch ganch_3 svelte-12zap3l");
    			add_location(div2, file$3, 239, 4, 7108);
    			attr_dev(div3, "class", "sec_pop svelte-12zap3l");
    			add_location(div3, file$3, 240, 4, 7142);
    			attr_dev(p, "class", "spacex svelte-12zap3l");
    			add_location(p, file$3, 242, 6, 7213);
    			attr_dev(div4, "class", "text po-abs tx-c w-100 svelte-12zap3l");
    			add_location(div4, file$3, 241, 4, 7170);
    			attr_dev(div5, "class", "prop svelte-12zap3l");
    			add_location(div5, file$3, 244, 4, 7259);
    			attr_dev(div6, "class", "top svelte-12zap3l");
    			add_location(div6, file$3, 248, 8, 7339);
    			attr_dev(div7, "class", "flame svelte-12zap3l");
    			add_location(div7, file$3, 247, 6, 7311);
    			attr_dev(div8, "class", "boost svelte-12zap3l");
    			add_location(div8, file$3, 246, 4, 7285);
    			attr_dev(div9, "class", "leg leg_1 svelte-12zap3l");
    			add_location(div9, file$3, 252, 4, 7388);
    			attr_dev(div10, "class", "leg leg_2 svelte-12zap3l");
    			add_location(div10, file$3, 253, 4, 7418);
    			attr_dev(div11, "class", "leg leg_3 svelte-12zap3l");
    			add_location(div11, file$3, 254, 4, 7448);
    			attr_dev(div12, "class", "stand stand_1 svelte-12zap3l");
    			add_location(div12, file$3, 256, 4, 7479);
    			attr_dev(div13, "class", "stand stand_2 svelte-12zap3l");
    			add_location(div13, file$3, 257, 4, 7513);
    			attr_dev(div14, "class", "stand stand_3 svelte-12zap3l");
    			add_location(div14, file$3, 258, 4, 7547);
    			attr_dev(div15, "class", "rocket_c svelte-12zap3l");
    			add_location(div15, file$3, 230, 2, 6887);
    			attr_dev(div16, "class", "smoke");
    			add_location(div16, file$3, 260, 2, 7588);
    			attr_dev(div17, "class", "platform svelte-12zap3l");
    			add_location(div17, file$3, 261, 2, 7612);
    			attr_dev(div18, "id", "container");
    			attr_dev(div18, "size", "max");
    			attr_dev(div18, "class", "po-rel svelte-12zap3l");
    			attr_dev(div18, "bg", "0000");
    			set_style(div18, "display", "none");
    			add_location(div18, file$3, 224, 0, 6708);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div18, anchor);
    			append_dev(div18, img0);
    			append_dev(div18, t0);
    			append_dev(div18, div15);
    			append_dev(div15, img1);
    			append_dev(div15, t1);
    			append_dev(div15, div0);
    			append_dev(div15, t2);
    			append_dev(div15, div1);
    			append_dev(div15, t3);
    			append_dev(div15, div2);
    			append_dev(div15, t4);
    			append_dev(div15, div3);
    			append_dev(div15, t5);
    			append_dev(div15, div4);
    			append_dev(div4, p);
    			append_dev(div15, t7);
    			append_dev(div15, div5);
    			append_dev(div15, t8);
    			append_dev(div15, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div15, t9);
    			append_dev(div15, div9);
    			append_dev(div15, t10);
    			append_dev(div15, div10);
    			append_dev(div15, t11);
    			append_dev(div15, div11);
    			append_dev(div15, t12);
    			append_dev(div15, div12);
    			append_dev(div15, t13);
    			append_dev(div15, div13);
    			append_dev(div15, t14);
    			append_dev(div15, div14);
    			append_dev(div18, t15);
    			append_dev(div18, div16);
    			append_dev(div18, t16);
    			append_dev(div18, div17);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div18);
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

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Rocket", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Rocket> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Rocket extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Rocket",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/pages/home.svelte generated by Svelte v3.30.0 */
    const file$4 = "src/pages/home.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (83:8) {#each data.miles.reverse() as event}
    function create_each_block$1(ctx) {
    	let div3;
    	let div0;
    	let t0_value = /*event*/ ctx[2].event + "";
    	let t0;
    	let t1;
    	let div1;
    	let li;
    	let t2;
    	let hr;
    	let t3;
    	let div2;
    	let t4_value = /*event*/ ctx[2].year + "";
    	let t4;
    	let t5;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			li = element("li");
    			t2 = space();
    			hr = element("hr");
    			t3 = space();
    			div2 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			attr_dev(div0, "class", "p-10");
    			add_location(div0, file$4, 84, 12, 2399);
    			attr_dev(li, "class", "p-0 m-0 po-abs");
    			set_style(li, "top", "-0.66em");
    			set_style(li, "left", "calc(50% - 5px)");
    			set_style(li, "font-size", "48px");
    			add_location(li, file$4, 86, 14, 2484);
    			add_location(hr, file$4, 89, 14, 2617);
    			attr_dev(div1, "class", "po-rel");
    			add_location(div1, file$4, 85, 12, 2449);
    			attr_dev(div2, "class", "p-10");
    			add_location(div2, file$4, 91, 12, 2655);
    			attr_dev(div3, "class", "tx-c m-10 p-10");
    			set_style(div3, "white-space", "nowrap");
    			add_location(div3, file$4, 83, 10, 2329);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, t0);
    			append_dev(div3, t1);
    			append_dev(div3, div1);
    			append_dev(div1, li);
    			append_dev(div1, t2);
    			append_dev(div1, hr);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(div2, t4);
    			append_dev(div3, t5);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(83:8) {#each data.miles.reverse() as event}",
    		ctx
    	});

    	return block;
    }

    // (82:6) <article class="flex-col p-10 milestones rx-5" slot="body">
    function create_body_slot_1(ctx) {
    	let article;
    	let each_value = data.miles.reverse();
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			article = element("article");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(article, "class", "flex-col p-10 milestones rx-5 svelte-ghxk15");
    			attr_dev(article, "slot", "body");
    			add_location(article, file$4, 81, 6, 2213);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(article, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 0) {
    				each_value = data.miles.reverse();
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(article, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot_1.name,
    		type: "slot",
    		source: "(82:6) <article class=\\\"flex-col p-10 milestones rx-5\\\" slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    // (98:6) <article class="p-10 flex jtx-ev" slot="body">
    function create_body_slot(ctx) {
    	let article;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let a0_href_value;
    	let t0;
    	let a1;
    	let img1;
    	let img1_src_value;
    	let a1_href_value;
    	let t1;
    	let a2;
    	let img2;
    	let img2_src_value;
    	let a2_href_value;

    	const block = {
    		c: function create() {
    			article = element("article");
    			a0 = element("a");
    			img0 = element("img");
    			t0 = space();
    			a1 = element("a");
    			img1 = element("img");
    			t1 = space();
    			a2 = element("a");
    			img2 = element("img");
    			attr_dev(img0, "size", "ic-lg");
    			if (img0.src !== (img0_src_value = "./assets/icons/youtube.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			add_location(img0, file$4, 99, 10, 2938);
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", a0_href_value = links.content.yt);
    			add_location(a0, file$4, 98, 8, 2884);
    			attr_dev(img1, "size", "ic-lg");
    			if (img1.src !== (img1_src_value = "./assets/icons/facebook.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			add_location(img1, file$4, 102, 10, 3073);
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", a1_href_value = links.social.fb);
    			add_location(a1, file$4, 101, 8, 3020);
    			attr_dev(img2, "size", "ic-lg");
    			if (img2.src !== (img2_src_value = "./assets/icons/insta.svg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "");
    			add_location(img2, file$4, 105, 10, 3209);
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", a2_href_value = links.social.ig);
    			add_location(a2, file$4, 104, 8, 3156);
    			attr_dev(article, "class", "p-10 flex jtx-ev svelte-ghxk15");
    			attr_dev(article, "slot", "body");
    			add_location(article, file$4, 97, 6, 2829);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, a0);
    			append_dev(a0, img0);
    			append_dev(article, t0);
    			append_dev(article, a1);
    			append_dev(a1, img1);
    			append_dev(article, t1);
    			append_dev(article, a2);
    			append_dev(a2, img2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot.name,
    		type: "slot",
    		source: "(98:6) <article class=\\\"p-10 flex jtx-ev\\\" slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let celestia_page;
    	let div4;
    	let div1;
    	let div0;
    	let logo;
    	let t0;
    	let img;
    	let img_src_value;
    	let t1;
    	let div2;
    	let t3;
    	let div3;
    	let t5;
    	let section;
    	let article;
    	let button0;
    	let t7;
    	let button1;
    	let a;
    	let t9;
    	let div5;
    	let rocket;
    	let t10;
    	let containr0;
    	let t11;
    	let containr1;
    	let current;
    	let mounted;
    	let dispose;
    	logo = new Logo({ props: { wd: "200" }, $$inline: true });
    	rocket = new Rocket({ $$inline: true });

    	containr0 = new Containr({
    			props: {
    				title: "Through the Telescope",
    				icon: "clock",
    				bg: "e66-c26",
    				$$slots: { body: [create_body_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	containr1 = new Containr({
    			props: {
    				title: "Connect With Us",
    				icon: "heart",
    				bg: "66e-37f",
    				$$slots: { body: [create_body_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			celestia_page = element("celestia-page");
    			div4 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			create_component(logo.$$.fragment);
    			t0 = space();
    			img = element("img");
    			t1 = space();
    			div2 = element("div");
    			div2.textContent = "Welcome to SEDS Celestia";
    			t3 = space();
    			div3 = element("div");
    			div3.textContent = "↓";
    			t5 = space();
    			section = element("section");
    			article = element("article");
    			button0 = element("button");
    			button0.textContent = "Projects";
    			t7 = space();
    			button1 = element("button");
    			a = element("a");
    			a.textContent = "Blog";
    			t9 = space();
    			div5 = element("div");
    			create_component(rocket.$$.fragment);
    			t10 = space();
    			create_component(containr0.$$.fragment);
    			t11 = space();
    			create_component(containr1.$$.fragment);
    			attr_dev(div0, "class", "z-0 po-abs w-gen logo svelte-ghxk15");
    			add_location(div0, file$4, 55, 6, 1324);
    			attr_dev(img, "class", "m-0 w-100 h-100");
    			if (img.src !== (img_src_value = "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pillars_of_creation.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$4, 58, 6, 1405);
    			attr_dev(div1, "class", "image-container p-0 m-0 w-100 po-rel");
    			set_style(div1, "height", "100vh");
    			add_location(div1, file$4, 54, 4, 1245);
    			attr_dev(div2, "class", "w-100 h-100 po-abs flex jtx-ct welc svelte-ghxk15");
    			attr_dev(div2, "bg", "0008");
    			add_location(div2, file$4, 63, 4, 1604);
    			attr_dev(div3, "class", "po-abs w-100 flex jtx-ct darr svelte-ghxk15");
    			add_location(div3, file$4, 66, 4, 1710);
    			attr_dev(div4, "class", "section");
    			add_location(div4, file$4, 53, 2, 1219);
    			attr_dev(button0, "class", "btn-std");
    			add_location(button0, file$4, 70, 6, 1844);
    			attr_dev(a, "href", "http://blog.sedscelestia.org");
    			add_location(a, file$4, 74, 8, 1981);
    			attr_dev(button1, "class", "btn-std");
    			add_location(button1, file$4, 73, 6, 1948);
    			attr_dev(article, "class", "flex jtx-ar svelte-ghxk15");
    			add_location(article, file$4, 69, 4, 1808);
    			attr_dev(div5, "id", "rocket");
    			set_style(div5, "min-height", "100px");
    			add_location(div5, file$4, 77, 4, 2064);
    			attr_dev(section, "class", "adaptive");
    			add_location(section, file$4, 68, 2, 1777);
    			set_custom_element_data(celestia_page, "class", "p-0 m-0");
    			add_location(celestia_page, file$4, 52, 0, 1185);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_page, anchor);
    			append_dev(celestia_page, div4);
    			append_dev(div4, div1);
    			append_dev(div1, div0);
    			mount_component(logo, div0, null);
    			append_dev(div1, t0);
    			append_dev(div1, img);
    			append_dev(div4, t1);
    			append_dev(div4, div2);
    			append_dev(div4, t3);
    			append_dev(div4, div3);
    			append_dev(celestia_page, t5);
    			append_dev(celestia_page, section);
    			append_dev(section, article);
    			append_dev(article, button0);
    			append_dev(article, t7);
    			append_dev(article, button1);
    			append_dev(button1, a);
    			append_dev(section, t9);
    			append_dev(section, div5);
    			mount_component(rocket, div5, null);
    			append_dev(section, t10);
    			mount_component(containr0, section, null);
    			append_dev(section, t11);
    			mount_component(containr1, section, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button0, "click", /*click_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const containr0_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				containr0_changes.$$scope = { dirty, ctx };
    			}

    			containr0.$set(containr0_changes);
    			const containr1_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				containr1_changes.$$scope = { dirty, ctx };
    			}

    			containr1.$set(containr1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(logo.$$.fragment, local);
    			transition_in(rocket.$$.fragment, local);
    			transition_in(containr0.$$.fragment, local);
    			transition_in(containr1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(logo.$$.fragment, local);
    			transition_out(rocket.$$.fragment, local);
    			transition_out(containr0.$$.fragment, local);
    			transition_out(containr1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(celestia_page);
    			destroy_component(logo);
    			destroy_component(rocket);
    			destroy_component(containr0);
    			destroy_component(containr1);
    			mounted = false;
    			dispose();
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
    	validate_slots("Home", slots, []);
    	let { changePage } = $$props;

    	onMount(() => {
    		const target = document.querySelector("#rocket");

    		let handleIntersection = entries => entries.map(entry => {
    			if (entry.isIntersecting) entry.target.childNodes[0].classList.add("display");
    		});

    		const observer = new IntersectionObserver(handleIntersection);
    		observer.observe(target);
    		return 0;
    	});

    	const writable_props = ["changePage"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => changePage("Projects");

    	$$self.$$set = $$props => {
    		if ("changePage" in $$props) $$invalidate(0, changePage = $$props.changePage);
    	};

    	$$self.$capture_state = () => ({
    		changePage,
    		data,
    		Logo,
    		Containr,
    		Rocket,
    		onMount
    	});

    	$$self.$inject_state = $$props => {
    		if ("changePage" in $$props) $$invalidate(0, changePage = $$props.changePage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [changePage, click_handler];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { changePage: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*changePage*/ ctx[0] === undefined && !("changePage" in props)) {
    			console.warn("<Home> was created without expected prop 'changePage'");
    		}
    	}

    	get changePage() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set changePage(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/micro/footer.svelte generated by Svelte v3.30.0 */

    const file$5 = "src/micro/footer.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (21:4) {#each pages as page}
    function create_each_block$2(ctx) {
    	let div;
    	let t_value = /*page*/ ctx[3].page + "";
    	let t;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[2](/*page*/ ctx[3]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			add_location(div, file$5, 21, 6, 388);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*pages*/ 2 && t_value !== (t_value = /*page*/ ctx[3].page + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(21:4) {#each pages as page}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let celestia_footer;
    	let div0;
    	let h50;
    	let t1;
    	let t2;
    	let div1;
    	let hr0;
    	let t3;
    	let div2;
    	let h51;
    	let t5;
    	let a0;
    	let t6;
    	let a0_href_value;
    	let t7;
    	let br0;
    	let t8;
    	let a1;
    	let t9;
    	let a1_href_value;
    	let t10;
    	let br1;
    	let t11;
    	let a2;
    	let t12;
    	let a2_href_value;
    	let t13;
    	let br2;
    	let t14;
    	let a3;
    	let t15;
    	let a3_href_value;
    	let t16;
    	let div3;
    	let hr1;
    	let t17;
    	let div4;
    	let h52;
    	let t19;
    	let a4;
    	let t20;
    	let a4_href_value;
    	let t21;
    	let br3;
    	let t22;
    	let a5;
    	let t23;
    	let a5_href_value;
    	let t24;
    	let br4;
    	let t25;
    	let a6;
    	let t26;
    	let a6_href_value;
    	let t27;
    	let br5;
    	let t28;
    	let a7;
    	let t29;
    	let a7_href_value;
    	let t30;
    	let br6;
    	let t31;
    	let a8;
    	let t32;
    	let a8_href_value;
    	let t33;
    	let br7;
    	let t34;
    	let a9;
    	let t35;
    	let a9_href_value;
    	let t36;
    	let br8;
    	let t37;
    	let a10;
    	let t38;
    	let a10_href_value;
    	let t39;
    	let div5;
    	let hr2;
    	let t40;
    	let div6;
    	let h53;
    	let t42;
    	let a11;
    	let t44;
    	let br9;
    	let t45;
    	let a12;
    	let t46;
    	let a12_href_value;
    	let t47;
    	let br10;
    	let t48;
    	let a13;
    	let t49;
    	let a13_href_value;
    	let t50;
    	let br11;
    	let t51;
    	let a14;
    	let t52;
    	let a14_href_value;
    	let each_value = /*pages*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			celestia_footer = element("celestia-footer");
    			div0 = element("div");
    			h50 = element("h5");
    			h50.textContent = "Sitemap";
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			div1 = element("div");
    			hr0 = element("hr");
    			t3 = space();
    			div2 = element("div");
    			h51 = element("h5");
    			h51.textContent = "Our Accounts";
    			t5 = space();
    			a0 = element("a");
    			t6 = text("Instagram");
    			t7 = space();
    			br0 = element("br");
    			t8 = space();
    			a1 = element("a");
    			t9 = text("Facebook");
    			t10 = space();
    			br1 = element("br");
    			t11 = space();
    			a2 = element("a");
    			t12 = text("Github");
    			t13 = space();
    			br2 = element("br");
    			t14 = space();
    			a3 = element("a");
    			t15 = text("LinkedIn");
    			t16 = space();
    			div3 = element("div");
    			hr1 = element("hr");
    			t17 = space();
    			div4 = element("div");
    			h52 = element("h5");
    			h52.textContent = "Our Content";
    			t19 = space();
    			a4 = element("a");
    			t20 = text("Youtube");
    			t21 = space();
    			br3 = element("br");
    			t22 = space();
    			a5 = element("a");
    			t23 = text("Blog");
    			t24 = space();
    			br4 = element("br");
    			t25 = space();
    			a6 = element("a");
    			t26 = text("Spotify");
    			t27 = space();
    			br5 = element("br");
    			t28 = space();
    			a7 = element("a");
    			t29 = text("Radio Public");
    			t30 = space();
    			br6 = element("br");
    			t31 = space();
    			a8 = element("a");
    			t32 = text("Google Podcasts");
    			t33 = space();
    			br7 = element("br");
    			t34 = space();
    			a9 = element("a");
    			t35 = text("Pocketcast");
    			t36 = space();
    			br8 = element("br");
    			t37 = space();
    			a10 = element("a");
    			t38 = text("Breaker");
    			t39 = space();
    			div5 = element("div");
    			hr2 = element("hr");
    			t40 = space();
    			div6 = element("div");
    			h53 = element("h5");
    			h53.textContent = "External Links";
    			t42 = space();
    			a11 = element("a");
    			a11.textContent = "Old Website";
    			t44 = space();
    			br9 = element("br");
    			t45 = space();
    			a12 = element("a");
    			t46 = text("SEDS Celestia Edu");
    			t47 = space();
    			br10 = element("br");
    			t48 = space();
    			a13 = element("a");
    			t49 = text("SEDS India");
    			t50 = space();
    			br11 = element("br");
    			t51 = space();
    			a14 = element("a");
    			t52 = text("SEDS Earth");
    			add_location(h50, file$5, 19, 4, 339);
    			add_location(div0, file$5, 18, 2, 329);
    			add_location(hr0, file$5, 25, 4, 496);
    			attr_dev(div1, "class", "flex");
    			add_location(div1, file$5, 24, 2, 473);
    			add_location(h51, file$5, 28, 4, 524);
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", a0_href_value = links.social.ig);
    			add_location(a0, file$5, 29, 4, 550);
    			add_location(br0, file$5, 30, 4, 610);
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", a1_href_value = links.social.fb);
    			add_location(a1, file$5, 31, 4, 621);
    			add_location(br1, file$5, 32, 4, 680);
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", a2_href_value = links.social.git);
    			add_location(a2, file$5, 33, 4, 691);
    			add_location(br2, file$5, 34, 4, 749);
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "href", a3_href_value = links.social.lin);
    			add_location(a3, file$5, 35, 4, 760);
    			add_location(div2, file$5, 27, 2, 514);
    			add_location(hr1, file$5, 38, 4, 850);
    			attr_dev(div3, "class", "flex");
    			add_location(div3, file$5, 37, 2, 827);
    			add_location(h52, file$5, 41, 4, 878);
    			attr_dev(a4, "target", "_blank");
    			attr_dev(a4, "href", a4_href_value = links.content.yt);
    			add_location(a4, file$5, 42, 4, 903);
    			add_location(br3, file$5, 43, 4, 962);
    			attr_dev(a5, "target", "_blank");
    			attr_dev(a5, "href", a5_href_value = links.content.blog);
    			add_location(a5, file$5, 44, 4, 973);
    			add_location(br4, file$5, 45, 4, 1031);
    			attr_dev(a6, "target", "_blank");
    			attr_dev(a6, "href", a6_href_value = links.content.spotify);
    			add_location(a6, file$5, 46, 4, 1042);
    			add_location(br5, file$5, 47, 4, 1106);
    			attr_dev(a7, "target", "_blank");
    			attr_dev(a7, "href", a7_href_value = links.content.radiopub);
    			add_location(a7, file$5, 48, 4, 1117);
    			add_location(br6, file$5, 49, 4, 1187);
    			attr_dev(a8, "target", "_blank");
    			attr_dev(a8, "href", a8_href_value = links.content.gpods);
    			add_location(a8, file$5, 50, 4, 1198);
    			add_location(br7, file$5, 51, 4, 1268);
    			attr_dev(a9, "target", "_blank");
    			attr_dev(a9, "href", a9_href_value = links.content.pocketcast);
    			add_location(a9, file$5, 52, 4, 1279);
    			add_location(br8, file$5, 53, 4, 1349);
    			attr_dev(a10, "target", "_blank");
    			attr_dev(a10, "href", a10_href_value = links.content.breaker);
    			add_location(a10, file$5, 54, 4, 1360);
    			add_location(div4, file$5, 40, 2, 868);
    			add_location(hr2, file$5, 57, 4, 1454);
    			attr_dev(div5, "class", "flex");
    			add_location(div5, file$5, 56, 2, 1431);
    			add_location(h53, file$5, 60, 4, 1482);
    			attr_dev(a11, "target", "_blank");
    			attr_dev(a11, "href", "/Galileo");
    			add_location(a11, file$5, 61, 4, 1510);
    			add_location(br9, file$5, 62, 4, 1565);
    			attr_dev(a12, "target", "_blank");
    			attr_dev(a12, "href", a12_href_value = links.web.educelestia);
    			add_location(a12, file$5, 63, 4, 1576);
    			add_location(br10, file$5, 64, 4, 1650);
    			attr_dev(a13, "target", "_blank");
    			attr_dev(a13, "href", a13_href_value = links.web.sedsi);
    			add_location(a13, file$5, 65, 4, 1661);
    			add_location(br11, file$5, 66, 4, 1722);
    			attr_dev(a14, "target", "_blank");
    			attr_dev(a14, "href", a14_href_value = links.web.sedse);
    			add_location(a14, file$5, 67, 4, 1733);
    			add_location(div6, file$5, 59, 2, 1472);
    			set_custom_element_data(celestia_footer, "class", "footer flex p-20 svelte-5ybqcy");
    			add_location(celestia_footer, file$5, 17, 0, 284);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_footer, anchor);
    			append_dev(celestia_footer, div0);
    			append_dev(div0, h50);
    			append_dev(div0, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(celestia_footer, t2);
    			append_dev(celestia_footer, div1);
    			append_dev(div1, hr0);
    			append_dev(celestia_footer, t3);
    			append_dev(celestia_footer, div2);
    			append_dev(div2, h51);
    			append_dev(div2, t5);
    			append_dev(div2, a0);
    			append_dev(a0, t6);
    			append_dev(div2, t7);
    			append_dev(div2, br0);
    			append_dev(div2, t8);
    			append_dev(div2, a1);
    			append_dev(a1, t9);
    			append_dev(div2, t10);
    			append_dev(div2, br1);
    			append_dev(div2, t11);
    			append_dev(div2, a2);
    			append_dev(a2, t12);
    			append_dev(div2, t13);
    			append_dev(div2, br2);
    			append_dev(div2, t14);
    			append_dev(div2, a3);
    			append_dev(a3, t15);
    			append_dev(celestia_footer, t16);
    			append_dev(celestia_footer, div3);
    			append_dev(div3, hr1);
    			append_dev(celestia_footer, t17);
    			append_dev(celestia_footer, div4);
    			append_dev(div4, h52);
    			append_dev(div4, t19);
    			append_dev(div4, a4);
    			append_dev(a4, t20);
    			append_dev(div4, t21);
    			append_dev(div4, br3);
    			append_dev(div4, t22);
    			append_dev(div4, a5);
    			append_dev(a5, t23);
    			append_dev(div4, t24);
    			append_dev(div4, br4);
    			append_dev(div4, t25);
    			append_dev(div4, a6);
    			append_dev(a6, t26);
    			append_dev(div4, t27);
    			append_dev(div4, br5);
    			append_dev(div4, t28);
    			append_dev(div4, a7);
    			append_dev(a7, t29);
    			append_dev(div4, t30);
    			append_dev(div4, br6);
    			append_dev(div4, t31);
    			append_dev(div4, a8);
    			append_dev(a8, t32);
    			append_dev(div4, t33);
    			append_dev(div4, br7);
    			append_dev(div4, t34);
    			append_dev(div4, a9);
    			append_dev(a9, t35);
    			append_dev(div4, t36);
    			append_dev(div4, br8);
    			append_dev(div4, t37);
    			append_dev(div4, a10);
    			append_dev(a10, t38);
    			append_dev(celestia_footer, t39);
    			append_dev(celestia_footer, div5);
    			append_dev(div5, hr2);
    			append_dev(celestia_footer, t40);
    			append_dev(celestia_footer, div6);
    			append_dev(div6, h53);
    			append_dev(div6, t42);
    			append_dev(div6, a11);
    			append_dev(div6, t44);
    			append_dev(div6, br9);
    			append_dev(div6, t45);
    			append_dev(div6, a12);
    			append_dev(a12, t46);
    			append_dev(div6, t47);
    			append_dev(div6, br10);
    			append_dev(div6, t48);
    			append_dev(div6, a13);
    			append_dev(a13, t49);
    			append_dev(div6, t50);
    			append_dev(div6, br11);
    			append_dev(div6, t51);
    			append_dev(div6, a14);
    			append_dev(a14, t52);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*changePage, pages*/ 3) {
    				each_value = /*pages*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
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
    			if (detaching) detach_dev(celestia_footer);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Footer", slots, []);
    	let { changePage } = $$props, { pages } = $$props;
    	const writable_props = ["changePage", "pages"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	const click_handler = page => changePage(page.page);

    	$$self.$$set = $$props => {
    		if ("changePage" in $$props) $$invalidate(0, changePage = $$props.changePage);
    		if ("pages" in $$props) $$invalidate(1, pages = $$props.pages);
    	};

    	$$self.$capture_state = () => ({ changePage, pages });

    	$$self.$inject_state = $$props => {
    		if ("changePage" in $$props) $$invalidate(0, changePage = $$props.changePage);
    		if ("pages" in $$props) $$invalidate(1, pages = $$props.pages);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [changePage, pages, click_handler];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { changePage: 0, pages: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*changePage*/ ctx[0] === undefined && !("changePage" in props)) {
    			console.warn("<Footer> was created without expected prop 'changePage'");
    		}

    		if (/*pages*/ ctx[1] === undefined && !("pages" in props)) {
    			console.warn("<Footer> was created without expected prop 'pages'");
    		}
    	}

    	get changePage() {
    		throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set changePage(value) {
    		throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pages() {
    		throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pages(value) {
    		throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/micro/earth.svelte generated by Svelte v3.30.0 */

    const file$6 = "src/micro/earth.svelte";

    function create_fragment$6(ctx) {
    	let div10;
    	let div8;
    	let div1;
    	let div0;
    	let t0;
    	let div4;
    	let div2;
    	let t1;
    	let div3;
    	let t2;
    	let div7;
    	let div5;
    	let t3;
    	let div6;
    	let t4;
    	let div9;

    	const block = {
    		c: function create() {
    			div10 = element("div");
    			div8 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div4 = element("div");
    			div2 = element("div");
    			t1 = space();
    			div3 = element("div");
    			t2 = space();
    			div7 = element("div");
    			div5 = element("div");
    			t3 = space();
    			div6 = element("div");
    			t4 = space();
    			div9 = element("div");
    			attr_dev(div0, "class", "earth__shadow svelte-a558kv");
    			add_location(div0, file$6, 211, 12, 4342);
    			attr_dev(div1, "class", "earth__shadow-container svelte-a558kv");
    			add_location(div1, file$6, 210, 8, 4292);
    			attr_dev(div2, "class", "clouds__group-1 svelte-a558kv");
    			add_location(div2, file$6, 214, 12, 4428);
    			attr_dev(div3, "class", "clouds__group-2 svelte-a558kv");
    			add_location(div3, file$6, 215, 12, 4472);
    			attr_dev(div4, "class", "clouds svelte-a558kv");
    			add_location(div4, file$6, 213, 8, 4395);
    			attr_dev(div5, "class", "trees__group-1 svelte-a558kv");
    			add_location(div5, file$6, 218, 12, 4559);
    			attr_dev(div6, "class", "trees__group-2 svelte-a558kv");
    			add_location(div6, file$6, 219, 12, 4602);
    			attr_dev(div7, "class", "trees svelte-a558kv");
    			add_location(div7, file$6, 217, 8, 4527);
    			attr_dev(div8, "class", "earth svelte-a558kv");
    			add_location(div8, file$6, 209, 4, 4264);
    			attr_dev(div9, "class", "earth-aura svelte-a558kv");
    			add_location(div9, file$6, 222, 4, 4663);
    			attr_dev(div10, "class", "wrapper svelte-a558kv");
    			add_location(div10, file$6, 208, 0, 4238);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div10, anchor);
    			append_dev(div10, div8);
    			append_dev(div8, div1);
    			append_dev(div1, div0);
    			append_dev(div8, t0);
    			append_dev(div8, div4);
    			append_dev(div4, div2);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div8, t2);
    			append_dev(div8, div7);
    			append_dev(div7, div5);
    			append_dev(div7, t3);
    			append_dev(div7, div6);
    			append_dev(div10, t4);
    			append_dev(div10, div9);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div10);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Earth", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Earth> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Earth extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Earth",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    var mgmt = [
    	{
    		img: "./assets/team/prorush.jpg",
    		post: "President",
    		name: "Paurush Punyasheel"
    	},
    	{
    		img: "./assets/team/ankit.jpg",
    		post: "Vice-President",
    		name: "Ankit Verma"
    	},
    	{
    		img: "./assets/team/yash.jpg",
    		post: "Secretary & Publicity Head",
    		name: "Yash Saini"
    	},
    	{
    		img: "./assets/team/cube.jpg",
    		post: "Observations Head",
    		name: "Kaustubh Murudkar"
    	},
    	{
    		img: "./assets/team/vivek.jpg",
    		post: "Projects Head",
    		name: "Vivek Subramaniam"
    	},
    	{
    		img: "./assets/team/frogu.jpg",
    		post: "Lectures & Podcast Head",
    		name: "Abdul Jawad Khan"
    	}
    ];
    var leads = [
    	{
    		img: "./assets/team/neil.jpeg",
    		name: "3 Sided Coin",
    		pos: "Neil Shah"
    	},
    	{
    		img: "./assets/team/yash.jpg",
    		name: "Brain Computer Interface",
    		pos: "Yash Saini"
    	},
    	{
    		img: "./assets/team/dubal.jpg",
    		name: "Quantum Chess",
    		pos: "Ayushi Dubal"
    	},
    	{
    		img: "./assets/team/cube.jpg",
    		name: "EINSat",
    		pos: "Kaustubh Murudkar"
    	},
    	{
    		img: "./assets/team/vivek.jpg",
    		name: "Cloud Chamber",
    		pos: "Vivek S."
    	},
    	{
    		img: "./assets/team/samarth.jpg",
    		name: "Binary Calculator",
    		pos: "Samarth Agrawal"
    	},
    	{
    		img: "./assets/team/patidar.jpg",
    		name: "CanSat",
    		pos: "Dhruv Patidar"
    	},
    	{
    		img: "./assets/team/gupte.jpg",
    		name: "Star Tracker",
    		pos: "Vivek Gupte"
    	},
    	{
    		img: "./assets/team/hvcs.png",
    		name: "Comet Trail Sim",
    		pos: "Harshvardhan C."
    	},
    	{
    		img: "./assets/team/venu.jpg",
    		name: "Rocketry",
    		pos: "Venugopalan Iyenger"
    	}
    ];
    var past = [
    	[
    		{
    			post: "President",
    			name: "Hrutwick Sawant"
    		},
    		{
    			post: "Vice-President",
    			name: "Harshvardhan Chandirasekar"
    		},
    		{
    			post: "Secretary & Publicity Head",
    			name: "Paurush Punyasheel"
    		},
    		{
    			post: "Observations Head",
    			name: "Kaustubh Murudkar"
    		},
    		{
    			post: "Projects Head",
    			name: "Ankit Verma"
    		},
    		{
    			post: "Lectures Head",
    			name: "Bhuvan S V"
    		}
    	],
    	[
    		{
    			post: "President",
    			name: "Venugopalan Iyengar"
    		},
    		{
    			post: "Vice-President",
    			name: "Vidit Parab"
    		},
    		{
    			post: "Sub-coordinator",
    			name: "Soham Deshpande"
    		},
    		{
    			post: "Secretary",
    			name: "Saransh Gokhale"
    		},
    		{
    			post: "Observations Head",
    			name: "Avdhoot Bhandare"
    		},
    		{
    			post: "Projects Head",
    			name: "Harshvardhan Chandirasekar"
    		},
    		{
    			post: "Lectures Head",
    			name: "Aaditee Juyal"
    		},
    		{
    			post: "Publicity Head",
    			name: "Devesh Dimble"
    		}
    	],
    	[
    		{
    			post: "President",
    			name: "Akash Chaudhary"
    		},
    		{
    			post: "Vice-President",
    			name: "Shirin Kaushik"
    		},
    		{
    			post: "Sub-coordinator",
    			name: "Ayush Agrawal"
    		},
    		{
    			post: "Secretary",
    			name: "Nikhil Bisht"
    		},
    		{
    			post: "Projects Head",
    			name: "Devashish Gupta"
    		},
    		{
    			post: "Lectures Head",
    			name: "Aditya Majali"
    		},
    		{
    			post: "Publicity Head",
    			name: "Samridh"
    		}
    	],
    	[
    		{
    			post: "President",
    			name: "Surendra"
    		},
    		{
    			post: "Vice-President",
    			name: "Komal Gupta"
    		},
    		{
    			post: "Sub-coordinator",
    			name: "Prakhar"
    		},
    		{
    			post: "Sub-coordinator",
    			name: "Khyati"
    		},
    		{
    			post: "Secretary",
    			name: "Mayur Joshi"
    		},
    		{
    			post: "Lectures Head",
    			name: "Pavan"
    		}
    	],
    	[
    		{
    			post: "President",
    			name: "Shivan Khullar"
    		},
    		{
    			post: "Vice-President",
    			name: "Raghav Arora"
    		},
    		{
    			post: "Secretary",
    			name: "Aman Agarwal"
    		}
    	],
    	[
    		{
    			post: "Coordinator",
    			name: "Siddharth Paliwal"
    		},
    		{
    			post: "Sub-coordinator (Technical)",
    			name: "Sanket Deshpande"
    		},
    		{
    			post: "Sub-coordinator (Managerial)",
    			name: "Lucky Kapoor"
    		}
    	],
    	[
    		{
    			post: "Coordinator",
    			name: "Pankaj Tiple"
    		},
    		{
    			post: "Sub-coordinator",
    			name: "Shubham Sarawat"
    		}
    	],
    	[
    		{
    			post: "Coordinator",
    			name: "Nikita Mirchandani"
    		},
    		{
    			post: "Sub-coordinator",
    			name: "Vishakha Gupta"
    		},
    		{
    			post: "Secretary",
    			name: "Raj Sinai"
    		}
    	]
    ];
    var data$1 = {
    	mgmt: mgmt,
    	leads: leads,
    	past: past
    };

    /* src/pages/team.svelte generated by Svelte v3.30.0 */
    const file$7 = "src/pages/team.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	child_ctx[2] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (33:6) <div slot="body">
    function create_body_slot_2(ctx) {
    	let div;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let p2;
    	let t5;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			p0.textContent = "SEDS Celestia is a chapter that is a part of SEDS India, headquartered\n          in VIT Vellore. The international headquarters of SEDS lies in MIT,\n          Boston, USA.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "People think that we Celestials just observe the “stars and the\n          planets” in the night sky. That’s partially correct. We do much more\n          than star gazing. We organise lectures by various eminent professors,\n          undertake many projects, exhibitions during quark, bonhomie with\n          seniors and Starparty!";
    			t3 = space();
    			p2 = element("p");
    			p2.textContent = "We are the Celestials! ❤️";
    			t5 = space();
    			img = element("img");
    			attr_dev(p0, "class", "tx-j svelte-121zowa");
    			add_location(p0, file$7, 33, 8, 702);
    			attr_dev(p1, "class", "tx-j svelte-121zowa");
    			add_location(p1, file$7, 38, 8, 922);
    			attr_dev(p2, "class", "tx-j svelte-121zowa");
    			add_location(p2, file$7, 45, 8, 1301);
    			attr_dev(img, "class", "w-100");
    			if (img.src !== (img_src_value = "./assets/images/team.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			set_style(img, "height", "200px");
    			add_location(img, file$7, 46, 8, 1355);
    			attr_dev(div, "slot", "body");
    			add_location(div, file$7, 32, 6, 676);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(div, t1);
    			append_dev(div, p1);
    			append_dev(div, t3);
    			append_dev(div, p2);
    			append_dev(div, t5);
    			append_dev(div, img);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot_2.name,
    		type: "slot",
    		source: "(33:6) <div slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    // (56:8) {#each data.mgmt as p}
    function create_each_block_3(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let br0;
    	let span0;
    	let t1_value = /*p*/ ctx[6].name + "";
    	let t1;
    	let t2;
    	let br1;
    	let span1;
    	let t3_value = /*p*/ ctx[6].post + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			br0 = element("br");
    			span0 = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			br1 = element("br");
    			span1 = element("span");
    			t3 = text(t3_value);
    			t4 = space();
    			attr_dev(img, "size", "md-lg");
    			attr_dev(img, "class", "rx-2 svelte-121zowa");
    			if (img.src !== (img_src_value = /*p*/ ctx[6].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$7, 57, 12, 1714);
    			add_location(br0, file$7, 58, 12, 1779);
    			attr_dev(span0, "class", "f-wt7");
    			add_location(span0, file$7, 58, 18, 1785);
    			add_location(br1, file$7, 59, 12, 1835);
    			set_style(span1, "color", "#fffc");
    			add_location(span1, file$7, 59, 18, 1841);
    			attr_dev(div, "class", "imgCont mgmt tx-c m-5 f-wt3 svelte-121zowa");
    			add_location(div, file$7, 56, 10, 1660);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, br0);
    			append_dev(div, span0);
    			append_dev(span0, t1);
    			append_dev(div, t2);
    			append_dev(div, br1);
    			append_dev(div, span1);
    			append_dev(span1, t3);
    			append_dev(div, t4);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(56:8) {#each data.mgmt as p}",
    		ctx
    	});

    	return block;
    }

    // (55:6) <div class="teamrow m-10 f-wrap" slot="body">
    function create_body_slot_1$1(ctx) {
    	let div;
    	let each_value_3 = data$1.mgmt;
    	validate_each_argument(each_value_3);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "teamrow m-10 f-wrap");
    			attr_dev(div, "slot", "body");
    			add_location(div, file$7, 54, 6, 1573);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 0) {
    				each_value_3 = data$1.mgmt;
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_3.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot_1$1.name,
    		type: "slot",
    		source: "(55:6) <div class=\\\"teamrow m-10 f-wrap\\\" slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    // (68:8) {#each data.leads as p}
    function create_each_block_2(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let br0;
    	let span0;
    	let t1_value = /*p*/ ctx[6].pos + "";
    	let t1;
    	let t2;
    	let br1;
    	let span1;
    	let t3_value = /*p*/ ctx[6].name + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			br0 = element("br");
    			span0 = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			br1 = element("br");
    			span1 = element("span");
    			t3 = text(t3_value);
    			t4 = space();
    			attr_dev(img, "size", "md");
    			attr_dev(img, "class", "rx-2 svelte-121zowa");
    			if (img.src !== (img_src_value = /*p*/ ctx[6].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$7, 69, 12, 2143);
    			add_location(br0, file$7, 70, 12, 2205);
    			attr_dev(span0, "class", "f-wt7");
    			add_location(span0, file$7, 70, 18, 2211);
    			add_location(br1, file$7, 71, 12, 2260);
    			set_style(span1, "color", "#fffc");
    			add_location(span1, file$7, 71, 18, 2266);
    			attr_dev(div, "class", "imgCont ldes tx-c m-5 f-wt3 svelte-121zowa");
    			add_location(div, file$7, 68, 10, 2089);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, br0);
    			append_dev(div, span0);
    			append_dev(span0, t1);
    			append_dev(div, t2);
    			append_dev(div, br1);
    			append_dev(div, span1);
    			append_dev(span1, t3);
    			append_dev(div, t4);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(68:8) {#each data.leads as p}",
    		ctx
    	});

    	return block;
    }

    // (67:6) <div class="teamrow f-wrap" slot="body">
    function create_body_slot$1(ctx) {
    	let div;
    	let each_value_2 = data$1.leads;
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "teamrow f-wrap");
    			attr_dev(div, "slot", "body");
    			add_location(div, file$7, 66, 6, 2006);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 0) {
    				each_value_2 = data$1.leads;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot$1.name,
    		type: "slot",
    		source: "(67:6) <div class=\\\"teamrow f-wrap\\\" slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    // (94:12) {#each pj as person}
    function create_each_block_1(ctx) {
    	let div;
    	let span0;
    	let t0_value = /*person*/ ctx[3].post + "";
    	let t0;
    	let t1;
    	let span1;
    	let t2_value = /*person*/ ctx[3].name + "";
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			span1 = element("span");
    			t2 = text(t2_value);
    			attr_dev(span0, "class", "f-wt7");
    			set_style(span0, "flex", "1");
    			add_location(span0, file$7, 95, 16, 3029);
    			set_style(span1, "flex", "1");
    			add_location(span1, file$7, 96, 16, 3101);
    			attr_dev(div, "class", "f-wt3 w-100 flex");
    			add_location(div, file$7, 94, 14, 2982);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, t0);
    			append_dev(div, t1);
    			append_dev(div, span1);
    			append_dev(span1, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(94:12) {#each pj as person}",
    		ctx
    	});

    	return block;
    }

    // (90:8) {#each data.past as pj, i}
    function create_each_block$3(ctx) {
    	let element_1;
    	let h4;
    	let t0_value = 2020 - /*i*/ ctx[2] + "";
    	let t0;
    	let t1;
    	let t2;
    	let each_value_1 = /*pj*/ ctx[0];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			element_1 = element("element");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			add_location(h4, file$7, 92, 12, 2915);
    			attr_dev(element_1, "class", "pastCard m-5 p-5");
    			add_location(element_1, file$7, 91, 10, 2868);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, element_1, anchor);
    			append_dev(element_1, h4);
    			append_dev(h4, t0);
    			append_dev(element_1, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(element_1, null);
    			}

    			append_dev(element_1, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 0) {
    				each_value_1 = /*pj*/ ctx[0];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(element_1, t2);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(element_1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(90:8) {#each data.past as pj, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let celestia_page;
    	let section;
    	let h1;
    	let t1;
    	let containr0;
    	let t2;
    	let containr1;
    	let t3;
    	let containr2;
    	let t4;
    	let details;
    	let summary;
    	let t5;
    	let i;
    	let t7;
    	let main;
    	let t8;
    	let earth;
    	let current;

    	containr0 = new Containr({
    			props: {
    				title: "SEDS CELESTIA",
    				icon: "null",
    				bg: "b5e-83c",
    				$$slots: { body: [create_body_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	containr1 = new Containr({
    			props: {
    				title: "Management",
    				icon: "empire",
    				bg: "66e-37f",
    				$$slots: { body: [create_body_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	containr2 = new Containr({
    			props: {
    				title: "Leads",
    				icon: "jedi",
    				bg: "e66-c26",
    				$$slots: { body: [create_body_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value = data$1.past;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	earth = new Earth({ $$inline: true });

    	const block = {
    		c: function create() {
    			celestia_page = element("celestia-page");
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "Team";
    			t1 = space();
    			create_component(containr0.$$.fragment);
    			t2 = space();
    			create_component(containr1.$$.fragment);
    			t3 = space();
    			create_component(containr2.$$.fragment);
    			t4 = space();
    			details = element("details");
    			summary = element("summary");
    			t5 = text("Past Leadership ");
    			i = element("i");
    			i.textContent = "(Click to Open)";
    			t7 = space();
    			main = element("main");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t8 = space();
    			create_component(earth.$$.fragment);
    			attr_dev(h1, "class", "tx-c po-stx p-10 z-4");
    			set_style(h1, "top", "0px");
    			attr_dev(h1, "bg", "000-nil");
    			add_location(h1, file$7, 30, 4, 534);
    			add_location(i, file$7, 79, 24, 2474);
    			set_style(summary, "font-size", "20px");
    			add_location(summary, file$7, 78, 6, 2417);
    			add_location(main, file$7, 81, 6, 2520);
    			attr_dev(details, "class", "p-10");
    			attr_dev(details, "bg", "66e-37f");
    			add_location(details, file$7, 77, 4, 2375);
    			attr_dev(section, "class", "adaptive");
    			add_location(section, file$7, 29, 2, 503);
    			add_location(celestia_page, file$7, 28, 0, 485);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_page, anchor);
    			append_dev(celestia_page, section);
    			append_dev(section, h1);
    			append_dev(section, t1);
    			mount_component(containr0, section, null);
    			append_dev(section, t2);
    			mount_component(containr1, section, null);
    			append_dev(section, t3);
    			mount_component(containr2, section, null);
    			append_dev(section, t4);
    			append_dev(section, details);
    			append_dev(details, summary);
    			append_dev(summary, t5);
    			append_dev(summary, i);
    			append_dev(details, t7);
    			append_dev(details, main);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(main, null);
    			}

    			append_dev(section, t8);
    			mount_component(earth, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const containr0_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				containr0_changes.$$scope = { dirty, ctx };
    			}

    			containr0.$set(containr0_changes);
    			const containr1_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				containr1_changes.$$scope = { dirty, ctx };
    			}

    			containr1.$set(containr1_changes);
    			const containr2_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				containr2_changes.$$scope = { dirty, ctx };
    			}

    			containr2.$set(containr2_changes);

    			if (dirty & /*data*/ 0) {
    				each_value = data$1.past;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(main, null);
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
    			transition_in(containr0.$$.fragment, local);
    			transition_in(containr1.$$.fragment, local);
    			transition_in(containr2.$$.fragment, local);
    			transition_in(earth.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(containr0.$$.fragment, local);
    			transition_out(containr1.$$.fragment, local);
    			transition_out(containr2.$$.fragment, local);
    			transition_out(earth.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(celestia_page);
    			destroy_component(containr0);
    			destroy_component(containr1);
    			destroy_component(containr2);
    			destroy_each(each_blocks, detaching);
    			destroy_component(earth);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Team", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Team> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Earth, data: data$1, Containr });
    	return [];
    }

    class Team extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Team",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/micro/bh.svelte generated by Svelte v3.30.0 */

    const file$8 = "src/micro/bh.svelte";

    function create_fragment$8(ctx) {
    	let div2;
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			attr_dev(div0, "class", "earth__shadow-container svelte-90kt5a");
    			add_location(div0, file$8, 39, 8, 869);
    			attr_dev(div1, "class", "earth svelte-90kt5a");
    			add_location(div1, file$8, 38, 4, 841);
    			attr_dev(div2, "class", "wrapper svelte-90kt5a");
    			add_location(div2, file$8, 37, 0, 815);
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
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props) {
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
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bh",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/nano/comet.svelte generated by Svelte v3.30.0 */

    const file$9 = "src/nano/comet.svelte";

    function create_fragment$9(ctx) {
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			attr_dev(div0, "class", "space__comet svelte-1q6673b");
    			add_location(div0, file$9, 35, 2, 1581);
    			attr_dev(div1, "class", "space__comet-container");
    			set_style(div1, "position", "fixed");
    			add_location(div1, file$9, 34, 0, 1518);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Comet", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Comet> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Comet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Comet",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    var going = [
    	{
    		under: "Dhruv Patidar",
    		name: "CanSat",
    		icon: "https://live.staticflickr.com/1082/672853757_9c08f408d9_b.jpg",
    		desc: "Remote sensing Atmosphere",
    		more: null,
    		moreLink: null
    	},
    	{
    		under: "Kaustubh Murudkar",
    		name: "EINSat",
    		icon: "./assets/images/projects-2020/einsat.png",
    		desc: "The CubeSat project of SEDS-Celestia planned to detect exoplanets",
    		more: null,
    		moreLink: null
    	},
    	{
    		under: "Venugopalan Iyengar",
    		name: "Rocketry",
    		icon: "./assets/images/projects-2020/rocketry.png",
    		desc: "Rocketry aims to build a self landing thrust-vector controlled rockets",
    		more: null
    	},
    	{
    		under: "Vivek Gupte",
    		name: "Star Tracker",
    		icon: "./assets/images/projects-2020/track.jpg",
    		desc: "Shows object aimed by telescope on a screen in real time",
    		more: null
    	},
    	{
    		under: "Neil Shah",
    		name: "3 Sided Coin",
    		icon: "./assets/images/projects-2020/3coin.jpg",
    		desc: "A perfect coin that has equal probability to land on its heads, tails and it's edge",
    		more: null
    	},
    	{
    		under: "Ayushi Dubal",
    		name: "Quantum Chess",
    		icon: "./assets/images/projects-2020/qchess.jpeg",
    		desc: "Quantum chess is reiteration of classical chess but with quantum rules",
    		more: null
    	},
    	{
    		under: "Yash Saini",
    		name: "Brain Computer Interface",
    		icon: "./assets/images/projects-2020/bci.png",
    		desc: "Designing an Ominidirection brain controlled rover",
    		more: null
    	},
    	{
    		under: "Samarth Agrawal",
    		name: "Binary Calculator",
    		icon: "./assets/images/projects-2020/bincalc.png",
    		desc: "A calculator made by transistor circuits",
    		more: null
    	},
    	{
    		under: "Vivek Subramanium",
    		name: "Cloud Chamber",
    		icon: "./assets/images/projects-2020/cloud.jpg",
    		desc: "An old school particle detector",
    		more: null
    	},
    	{
    		under: "Harshvardhan Chandirashekhar",
    		name: "Comet Dust Trail Simulation",
    		icon: "https://live.staticflickr.com/7210/6967153925_9716066eca.jpg",
    		desc: "Simulating icy comet dust trails",
    		more: null
    	}
    ];
    var past$1 = [
    	{
    		year: "2019",
    		under: "Venugopalan Iyengar",
    		name: "Lidar",
    		desc: "An attempt to create our inhouce lidar",
    		img: "./assets/logo-sq.png",
    		more: null
    	},
    	{
    		year: 2017,
    		under: "Venugopalan Iyengar",
    		name: "Tesla Coil",
    		desc: "The name speaks for itself",
    		img: "./assets/logo-sq.png",
    		more: ""
    	},
    	{
    		year: "2019",
    		under: "Venugopalan Iyengar",
    		name: "Microbial Fuel Cell",
    		desc: "Utilizing bacteria in order to catalize reactions and generate current",
    		img: "./assets/logo-sq.png",
    		more: null
    	},
    	{
    		year: "2019",
    		under: "Venugopalan Iyengar",
    		name: "Pyroboard",
    		desc: "Vibrating a burning gases to tunes from a speaker",
    		img: "./assets/logo-sq.png",
    		more: null
    	},
    	{
    		year: "2019",
    		under: "Venugopalan Iyengar",
    		name: "Spectrometer",
    		desc: "Design a spectrometer to determine the chemical composition of light sources or illuminated objects",
    		img: "./assets/logo-sq.png",
    		more: null
    	},
    	{
    		year: "2019",
    		under: "Venugopalan Iyengar",
    		name: "Physarum",
    		desc: "Solve basic computation problems using Physarum slime mold",
    		img: "./assets/logo-sq.png",
    		more: null
    	},
    	{
    		year: 2018,
    		under: "Venugopalan Iyengar",
    		name: "Sonoluminescence",
    		desc: "Create a sonoluminescent bubble and take temperature and spectral measurements of the light emitted",
    		img: "./assets/logo-sq.png",
    		more: ""
    	},
    	{
    		year: 2017,
    		under: "Venugopalan Iyengar",
    		name: "Barn Door Tracker",
    		desc: "Take exposure images of night’s sky using automated DSLR mount",
    		img: "./assets/logo-sq.png",
    		more: ""
    	},
    	{
    		year: 2017,
    		under: "Venugopalan Iyengar",
    		name: "N-body simulation",
    		desc: "It aimed to simulate the gravitational interaction of a swarm of bodies and study the clustering and dynamics of the structures formed",
    		img: "./assets/logo-sq.png",
    		more: ""
    	},
    	{
    		year: 2018,
    		under: "Venugopalan Iyengar",
    		name: "Schlieren Photography",
    		desc: "To Visualize pressure, temperature and composition gradients in fluid flow and observe the complex fractal like structures of turbulence",
    		img: "./assets/logo-sq.png",
    		more: ""
    	},
    	{
    		year: 2018,
    		under: "Venugopalan Iyengar",
    		name: "Reproduction of particle interference with walking droplets",
    		desc: "It aimed to recreate a quantum phenomena like interference with walking droplets on a vibrating fluid bed",
    		img: "./assets/logo-sq.png",
    		more: ""
    	},
    	{
    		year: 2018,
    		under: "Venugopalan Iyengar",
    		name: "Galaxy Classifier Neural Net",
    		desc: "It aimed to build and train a convolutional neural network that will classify galaxies using their images",
    		img: "./assets/logo-sq.png",
    		more: ""
    	},
    	{
    		year: 2018,
    		under: "Venugopalan Iyengar",
    		name: "Michelson Interferometers",
    		desc: "Build a Michelson interferometer without any expensive equipment and to explore the applications of interferometry in seismology and acoustics",
    		img: "./assets/logo-sq.png",
    		more: ""
    	}
    ];
    var data$2 = {
    	going: going,
    	past: past$1
    };

    /* src/shared/image.svelte generated by Svelte v3.30.0 */

    const file$a = "src/shared/image.svelte";

    // (26:2) {#if placements.topRight}
    function create_if_block_3(ctx) {
    	let div;
    	let t_value = /*placements*/ ctx[1].topRight + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "topRight po-abs rx-5 p-5 blur svelte-1c7twdb");
    			add_location(div, file$a, 26, 4, 404);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*placements*/ 2 && t_value !== (t_value = /*placements*/ ctx[1].topRight + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(26:2) {#if placements.topRight}",
    		ctx
    	});

    	return block;
    }

    // (29:2) {#if placements.topLeft}
    function create_if_block_2(ctx) {
    	let div;
    	let t_value = /*placements*/ ctx[1].topLeft + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "topLeft po-abs rx-5 p-5 blur svelte-1c7twdb");
    			add_location(div, file$a, 29, 4, 514);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*placements*/ 2 && t_value !== (t_value = /*placements*/ ctx[1].topLeft + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(29:2) {#if placements.topLeft}",
    		ctx
    	});

    	return block;
    }

    // (32:2) {#if placements.bottomLeft}
    function create_if_block_1(ctx) {
    	let div;
    	let t_value = /*placements*/ ctx[1].bottomLeft + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "bottomLeft po-abs rx-5 p-5 blur svelte-1c7twdb");
    			add_location(div, file$a, 32, 4, 625);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*placements*/ 2 && t_value !== (t_value = /*placements*/ ctx[1].bottomLeft + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(32:2) {#if placements.bottomLeft}",
    		ctx
    	});

    	return block;
    }

    // (35:2) {#if placements.bottomRight}
    function create_if_block$1(ctx) {
    	let div;
    	let t_value = /*placements*/ ctx[1].bottomRight + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "bottomRight po-abs rx-5 p-5 blur svelte-1c7twdb");
    			add_location(div, file$a, 35, 4, 743);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*placements*/ 2 && t_value !== (t_value = /*placements*/ ctx[1].bottomRight + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(35:2) {#if placements.bottomRight}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let img;
    	let img_src_value;
    	let if_block0 = /*placements*/ ctx[1].topRight && create_if_block_3(ctx);
    	let if_block1 = /*placements*/ ctx[1].topLeft && create_if_block_2(ctx);
    	let if_block2 = /*placements*/ ctx[1].bottomLeft && create_if_block_1(ctx);
    	let if_block3 = /*placements*/ ctx[1].bottomRight && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			t3 = space();
    			img = element("img");
    			attr_dev(img, "class", "w-100 rx-5");
    			if (img.src !== (img_src_value = /*src*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$a, 37, 2, 830);
    			attr_dev(div, "class", "lecture po-rel w-100");
    			add_location(div, file$a, 24, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t0);
    			if (if_block1) if_block1.m(div, null);
    			append_dev(div, t1);
    			if (if_block2) if_block2.m(div, null);
    			append_dev(div, t2);
    			if (if_block3) if_block3.m(div, null);
    			append_dev(div, t3);
    			append_dev(div, img);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*placements*/ ctx[1].topRight) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*placements*/ ctx[1].topLeft) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					if_block1.m(div, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*placements*/ ctx[1].bottomLeft) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_1(ctx);
    					if_block2.c();
    					if_block2.m(div, t2);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (/*placements*/ ctx[1].bottomRight) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);
    				} else {
    					if_block3 = create_if_block$1(ctx);
    					if_block3.c();
    					if_block3.m(div, t3);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}

    			if (dirty & /*src*/ 1 && img.src !== (img_src_value = /*src*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Image", slots, []);

    	let { src } = $$props,
    		{ placements = {
    			topRight: "",
    			bottomRight: "",
    			topLeft: "",
    			bottomLeft: ""
    		} } = $$props;

    	const writable_props = ["src", "placements"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Image> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("src" in $$props) $$invalidate(0, src = $$props.src);
    		if ("placements" in $$props) $$invalidate(1, placements = $$props.placements);
    	};

    	$$self.$capture_state = () => ({ src, placements });

    	$$self.$inject_state = $$props => {
    		if ("src" in $$props) $$invalidate(0, src = $$props.src);
    		if ("placements" in $$props) $$invalidate(1, placements = $$props.placements);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, placements];
    }

    class Image$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { src: 0, placements: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*src*/ ctx[0] === undefined && !("src" in props)) {
    			console.warn("<Image> was created without expected prop 'src'");
    		}
    	}

    	get src() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placements() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placements(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/proj.svelte generated by Svelte v3.30.0 */
    const file$b = "src/pages/proj.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (58:14) {#if pj.more}
    function create_if_block$2(ctx) {
    	let button;
    	let a;
    	let t_value = /*pj*/ ctx[3].more + "";
    	let t;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			button = element("button");
    			a = element("a");
    			t = text(t_value);
    			attr_dev(a, "href", a_href_value = /*pj*/ ctx[3].moreLink);
    			add_location(a, file$b, 59, 18, 1445);
    			attr_dev(button, "class", "btn-std");
    			add_location(button, file$b, 58, 16, 1402);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, a);
    			append_dev(a, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(58:14) {#if pj.more}",
    		ctx
    	});

    	return block;
    }

    // (48:4) {#each data.going as pj}
    function create_each_block_1$1(ctx) {
    	let div1;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let div0;
    	let span;
    	let t1_value = /*pj*/ ctx[3].name + "";
    	let t1;
    	let t2;
    	let hr;
    	let t3;
    	let details;
    	let summary;
    	let t4_value = /*pj*/ ctx[3].under + "";
    	let t4;
    	let t5;
    	let p;
    	let t6_value = /*pj*/ ctx[3].desc + "";
    	let t6;
    	let t7;
    	let t8;
    	let if_block = /*pj*/ ctx[3].more && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			img = element("img");
    			t0 = space();
    			div0 = element("div");
    			span = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			hr = element("hr");
    			t3 = space();
    			details = element("details");
    			summary = element("summary");
    			t4 = text(t4_value);
    			t5 = space();
    			p = element("p");
    			t6 = text(t6_value);
    			t7 = space();
    			if (if_block) if_block.c();
    			t8 = space();
    			if (img.src !== (img_src_value = /*pj*/ ctx[3].icon)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "w-100 z-0");
    			attr_dev(img, "height", "300px");
    			attr_dev(img, "alt", img_alt_value = /*pj*/ ctx[3].name);
    			add_location(img, file$b, 49, 8, 1042);
    			attr_dev(span, "class", "f-wt7");
    			add_location(span, file$b, 51, 10, 1202);
    			add_location(hr, file$b, 52, 10, 1249);
    			add_location(summary, file$b, 54, 12, 1288);
    			add_location(p, file$b, 55, 12, 1330);
    			add_location(details, file$b, 53, 10, 1266);
    			attr_dev(div0, "class", "title po-abs p-20 w-gen svelte-ezjcum");
    			set_style(div0, "--offset", "40px");
    			attr_dev(div0, "bg", "nil-000");
    			add_location(div0, file$b, 50, 8, 1119);
    			attr_dev(div1, "class", "boxy po-rel tx-l m-20 blur w-gen svelte-ezjcum");
    			add_location(div1, file$b, 48, 6, 987);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, img);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, span);
    			append_dev(span, t1);
    			append_dev(div0, t2);
    			append_dev(div0, hr);
    			append_dev(div0, t3);
    			append_dev(div0, details);
    			append_dev(details, summary);
    			append_dev(summary, t4);
    			append_dev(details, t5);
    			append_dev(details, p);
    			append_dev(p, t6);
    			append_dev(p, t7);
    			if (if_block) if_block.m(p, null);
    			append_dev(div1, t8);
    		},
    		p: function update(ctx, dirty) {
    			if (/*pj*/ ctx[3].more) if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(48:4) {#each data.going as pj}",
    		ctx
    	});

    	return block;
    }

    // (81:10) {#each data.past.filter((e) => e.name.includes(filter) || e.desc.includes(filter)) as pj, i}
    function create_each_block$4(ctx) {
    	let element_1;
    	let img;
    	let img_src_value;
    	let t0;
    	let div2;
    	let div0;
    	let t1_value = /*pj*/ ctx[3].name + "";
    	let t1;
    	let t2;
    	let t3_value = (/*pj*/ ctx[3].year || "Unknown") + "";
    	let t3;
    	let t4;
    	let t5;
    	let div1;
    	let t6_value = /*pj*/ ctx[3].desc + "";
    	let t6;
    	let t7;

    	const block = {
    		c: function create() {
    			element_1 = element("element");
    			img = element("img");
    			t0 = space();
    			div2 = element("div");
    			div0 = element("div");
    			t1 = text(t1_value);
    			t2 = text(" (");
    			t3 = text(t3_value);
    			t4 = text(")");
    			t5 = space();
    			div1 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			attr_dev(img, "class", "rx-50 p-5");
    			attr_dev(img, "bg", "000");
    			attr_dev(img, "size", "ic-md");
    			if (img.src !== (img_src_value = /*pj*/ ctx[3].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$b, 82, 14, 2249);
    			attr_dev(div0, "class", "f-wt7 p-10");
    			add_location(div0, file$b, 89, 16, 2451);
    			set_style(div1, "padding", "0 10px");
    			add_location(div1, file$b, 90, 16, 2532);
    			attr_dev(div2, "class", "m-5 f-wt3");
    			add_location(div2, file$b, 88, 14, 2411);
    			attr_dev(element_1, "class", "flex m-10 p-10");
    			add_location(element_1, file$b, 81, 12, 2202);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, element_1, anchor);
    			append_dev(element_1, img);
    			append_dev(element_1, t0);
    			append_dev(element_1, div2);
    			append_dev(div2, div0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, t3);
    			append_dev(div0, t4);
    			append_dev(div2, t5);
    			append_dev(div2, div1);
    			append_dev(div1, t6);
    			append_dev(element_1, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*filter*/ 1 && img.src !== (img_src_value = /*pj*/ ctx[3].img)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*filter*/ 1 && t1_value !== (t1_value = /*pj*/ ctx[3].name + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*filter*/ 1 && t3_value !== (t3_value = (/*pj*/ ctx[3].year || "Unknown") + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*filter*/ 1 && t6_value !== (t6_value = /*pj*/ ctx[3].desc + "")) set_data_dev(t6, t6_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(element_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(81:10) {#each data.past.filter((e) => e.name.includes(filter) || e.desc.includes(filter)) as pj, i}",
    		ctx
    	});

    	return block;
    }

    // (71:6) <details class="p-10 tx-l" bg="66e-37f" slot="body">
    function create_body_slot_1$2(ctx) {
    	let details;
    	let summary;
    	let i;
    	let t1;
    	let main;
    	let input;
    	let t2;
    	let mounted;
    	let dispose;
    	let each_value = data$2.past.filter(/*func*/ ctx[2]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			details = element("details");
    			summary = element("summary");
    			i = element("i");
    			i.textContent = "(Click to Open)";
    			t1 = space();
    			main = element("main");
    			input = element("input");
    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(i, file$b, 71, 40, 1809);
    			set_style(summary, "font-size", "20px");
    			add_location(summary, file$b, 71, 8, 1777);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "bg", "nil");
    			attr_dev(input, "class", "p-10 m-10 w-gen svelte-ezjcum");
    			attr_dev(input, "placeholder", "Search");
    			set_style(input, "height", "33px");
    			set_style(input, "--offset", "20px");
    			set_style(input, "font-size", "1.25em");
    			add_location(input, file$b, 73, 10, 1867);
    			add_location(main, file$b, 72, 8, 1850);
    			attr_dev(details, "class", "p-10 tx-l");
    			attr_dev(details, "bg", "66e-37f");
    			attr_dev(details, "slot", "body");
    			add_location(details, file$b, 70, 6, 1716);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, details, anchor);
    			append_dev(details, summary);
    			append_dev(summary, i);
    			append_dev(details, t1);
    			append_dev(details, main);
    			append_dev(main, input);
    			set_input_value(input, /*filter*/ ctx[0]);
    			append_dev(main, t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(main, null);
    			}

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[1]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*filter*/ 1 && input.value !== /*filter*/ ctx[0]) {
    				set_input_value(input, /*filter*/ ctx[0]);
    			}

    			if (dirty & /*data, filter*/ 1) {
    				each_value = data$2.past.filter(/*func*/ ctx[2]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(main, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(details);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot_1$2.name,
    		type: "slot",
    		source: "(71:6) <details class=\\\"p-10 tx-l\\\" bg=\\\"66e-37f\\\" slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    // (99:6) <div slot="body">
    function create_body_slot$2(ctx) {
    	let div;
    	let image0;
    	let t0;
    	let image1;
    	let t1;
    	let image2;
    	let current;

    	image0 = new Image$1({
    			props: {
    				src: "./assets/projects/kratos.png",
    				placements: {
    					topRight: "Now Independent",
    					bottomLeft: "Project Kratos"
    				}
    			},
    			$$inline: true
    		});

    	image1 = new Image$1({
    			props: {
    				src: "./assets/projects/rt.jpg",
    				placements: {
    					topRight: "Now Independent",
    					bottomLeft: "Project RT"
    				}
    			},
    			$$inline: true
    		});

    	image2 = new Image$1({
    			props: {
    				src: "./assets/projects/apeiro.jpg",
    				placements: {
    					topRight: "Ended",
    					bottomLeft: "Project Apeiro"
    				}
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(image0.$$.fragment);
    			t0 = space();
    			create_component(image1.$$.fragment);
    			t1 = space();
    			create_component(image2.$$.fragment);
    			attr_dev(div, "slot", "body");
    			add_location(div, file$b, 98, 6, 2759);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(image0, div, null);
    			append_dev(div, t0);
    			mount_component(image1, div, null);
    			append_dev(div, t1);
    			mount_component(image2, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(image0.$$.fragment, local);
    			transition_in(image1.$$.fragment, local);
    			transition_in(image2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(image0.$$.fragment, local);
    			transition_out(image1.$$.fragment, local);
    			transition_out(image2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(image0);
    			destroy_component(image1);
    			destroy_component(image2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot$2.name,
    		type: "slot",
    		source: "(99:6) <div slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let celestia_page;
    	let comet;
    	let t0;
    	let h1;
    	let t2;
    	let section0;
    	let t3;
    	let section1;
    	let containr0;
    	let t4;
    	let containr1;
    	let t5;
    	let bh;
    	let current;
    	comet = new Comet({ $$inline: true });
    	let each_value_1 = data$2.going;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	containr0 = new Containr({
    			props: {
    				title: "Past Projects",
    				icon: "tasks",
    				bg: "66e-37f",
    				$$slots: { body: [create_body_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	containr1 = new Containr({
    			props: {
    				title: "Notable Spinoffs",
    				icon: "dish",
    				bg: "e66-c26",
    				$$slots: { body: [create_body_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	bh = new Bh({ $$inline: true });

    	const block = {
    		c: function create() {
    			celestia_page = element("celestia-page");
    			create_component(comet.$$.fragment);
    			t0 = space();
    			h1 = element("h1");
    			h1.textContent = "Projects";
    			t2 = space();
    			section0 = element("section");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			section1 = element("section");
    			create_component(containr0.$$.fragment);
    			t4 = space();
    			create_component(containr1.$$.fragment);
    			t5 = space();
    			create_component(bh.$$.fragment);
    			attr_dev(h1, "class", "tx-c po-stx p-10 z-4 w-50 m-h-auto");
    			set_style(h1, "top", "0px");
    			attr_dev(h1, "bg", "000-nil");
    			add_location(h1, file$b, 43, 2, 812);
    			attr_dev(section0, "class", "section tx-c f-wrap svelte-ezjcum");
    			add_location(section0, file$b, 46, 2, 914);
    			attr_dev(section1, "class", "adaptive svelte-ezjcum");
    			add_location(section1, file$b, 68, 2, 1620);
    			add_location(celestia_page, file$b, 41, 0, 782);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_page, anchor);
    			mount_component(comet, celestia_page, null);
    			append_dev(celestia_page, t0);
    			append_dev(celestia_page, h1);
    			append_dev(celestia_page, t2);
    			append_dev(celestia_page, section0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section0, null);
    			}

    			append_dev(celestia_page, t3);
    			append_dev(celestia_page, section1);
    			mount_component(containr0, section1, null);
    			append_dev(section1, t4);
    			mount_component(containr1, section1, null);
    			append_dev(celestia_page, t5);
    			mount_component(bh, celestia_page, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 0) {
    				each_value_1 = data$2.going;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(section0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			const containr0_changes = {};

    			if (dirty & /*$$scope, filter*/ 257) {
    				containr0_changes.$$scope = { dirty, ctx };
    			}

    			containr0.$set(containr0_changes);
    			const containr1_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				containr1_changes.$$scope = { dirty, ctx };
    			}

    			containr1.$set(containr1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(comet.$$.fragment, local);
    			transition_in(containr0.$$.fragment, local);
    			transition_in(containr1.$$.fragment, local);
    			transition_in(bh.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(comet.$$.fragment, local);
    			transition_out(containr0.$$.fragment, local);
    			transition_out(containr1.$$.fragment, local);
    			transition_out(bh.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(celestia_page);
    			destroy_component(comet);
    			destroy_each(each_blocks, detaching);
    			destroy_component(containr0);
    			destroy_component(containr1);
    			destroy_component(bh);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Proj", slots, []);
    	let filter = "";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Proj> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		filter = this.value;
    		$$invalidate(0, filter);
    	}

    	const func = e => e.name.includes(filter) || e.desc.includes(filter);
    	$$self.$capture_state = () => ({ BH: Bh, Comet, data: data$2, Containr, Image: Image$1, filter });

    	$$self.$inject_state = $$props => {
    		if ("filter" in $$props) $$invalidate(0, filter = $$props.filter);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [filter, input_input_handler, func];
    }

    class Proj extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Proj",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/micro/mars.svelte generated by Svelte v3.30.0 */

    const file$c = "src/micro/mars.svelte";

    function create_fragment$c(ctx) {
    	let div6;
    	let div4;
    	let div1;
    	let div0;
    	let t0;
    	let div3;
    	let div2;
    	let t1;
    	let div5;

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div3 = element("div");
    			div2 = element("div");
    			t1 = space();
    			div5 = element("div");
    			attr_dev(div0, "class", "earth__shadow svelte-ba5v6m");
    			add_location(div0, file$c, 105, 12, 2061);
    			attr_dev(div1, "class", "earth__shadow-container svelte-ba5v6m");
    			add_location(div1, file$c, 104, 8, 2011);
    			attr_dev(div2, "class", "clouds__group-1 svelte-ba5v6m");
    			add_location(div2, file$c, 108, 12, 2147);
    			attr_dev(div3, "class", "clouds svelte-ba5v6m");
    			add_location(div3, file$c, 107, 8, 2114);
    			attr_dev(div4, "class", "earth svelte-ba5v6m");
    			add_location(div4, file$c, 103, 4, 1983);
    			attr_dev(div5, "class", "earth-aura svelte-ba5v6m");
    			add_location(div5, file$c, 111, 4, 2209);
    			attr_dev(div6, "class", "wrapper svelte-ba5v6m");
    			add_location(div6, file$c, 102, 0, 1957);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div4);
    			append_dev(div4, div1);
    			append_dev(div1, div0);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div6, t1);
    			append_dev(div6, div5);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Mars", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Mars> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Mars extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mars",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    var opensource = [
    	{
    		img: "./assets/images/qc.png",
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
    		img: "./assets/images/bci.png",
    		title: "Brain Computer Interface",
    		repo: "https://github.com/SEDSCelestiaBPGC/BCI"
    	},
    	{
    		show: -1,
    		img: "./assets/svgs/korolev.svg",
    		title: "Celestia-Korolev Website (Soon)",
    		repo: "https://github.com/SEDSCelestiaBPGC/BCI"
    	}
    ];
    var podcast = [
    	{
    		icon: "./assets/svgs/youtube.svg",
    		link: "youtube.com/playlist?list=PLGzI_TnIg-eqKRfQTB4wxVFGOnarP3jFJ"
    	},
    	{
    		icon: "./assets/svgs/spotify.svg",
    		link: "open.spotify.com/show/0NKbVLI7LpY6069IUCF6xi"
    	},
    	{
    		icon: "./assets/svgs/radiopublic.svg",
    		link: "radiopublic.com/celestia-onair-WeRp1J"
    	},
    	{
    		icon: "./assets/svgs/google.svg",
    		link: "podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy80NWYzZjAwOC9wb2RjYXN0L3Jzcw=="
    	},
    	{
    		icon: "./assets/svgs/pocketcast.svg",
    		link: "pca.st/b3mqu7bk"
    	},
    	{
    		icon: "./assets/svgs/breaker.png",
    		link: "breaker.audio/celestia-on-air"
    	}
    ];
    var data$3 = {
    	opensource: opensource,
    	podcast: podcast
    };

    const sheet = atob(
      "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMUp6dkhRM1hOZEphUHFSVm8tSzZBWmlsbHFYRUZGZG80NTBQLS1Xb3E0UUUvZ3Zpei90cT90cXg9b3V0OmNzdiZzaGVldD1Lb3JvbGV2LUxlY3R1cmVzLUFQSQ=="
    );

    const base = {
      url: "",
      title: "",
      image: "",
      text: "",
      date: "",
      time: "",
      prof: "",
    };

    const csvtojson = ( csv ) => {
      let lines = csv.replaceAll( '"', "" ).split( "\n" );
      let result = [];

      // NOTE: If your columns contain commas in their values, you'll need to convert them to  '&&'
      let headers = lines[ 0 ].split( "," );

      for ( let i = 1;i < lines.length;i++ ) {
        let obj = {};
        let currentline = lines[ i ].split( "," );
        for ( let j = 0;j < headers.length;j++ ) obj[ headers[ j ] ] = currentline[ j ].replaceAll( '&&', ',' );
        result.push( obj );
      }
      return JSON.stringify( result ) || 1;
    };

    const template = lec => {
      const driver = img => 'https://drive.google.com/uc?export=view&id=' + img?.split( '/d/' )[ 1 ]?.split( '/' )[ 0 ];
      return `
  <img class="w-100" height="300px" src="${ driver( lec.image ) }" alt="" />
  <div class="p-10">
    <div class="flex tx-j" style="justify-content:space-between;">
      <span class="f-wt7">${ lec.prof }: ${ lec.title.length > 20 ? lec.title.slice( 0, 20 ) + '...' : lec.title }</span>
      <span>${ lec.date }, ${ lec.time }</span>
    </div><div>&nbsp;</div>
    <div>${ lec.text }</div>
    <div class="flex" style="justify-content:space-between;">
      <span>&nbsp;</span>
      <span><a class="btn-std" href="${ lec.url }" style="--theme:#faa">Watch</a></span>
    </div>
  </div>`;
    };

    /* src/pages/events.svelte generated by Svelte v3.30.0 */
    const file$d = "src/pages/events.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    // (67:6) <div class="lecture po-rel w-100" slot="body">
    function create_body_slot_4(ctx) {
    	let div0;
    	let div3;
    	let div1;
    	let svg0;
    	let path0;
    	let t0;
    	let div2;
    	let svg1;
    	let path1;
    	let t1;
    	let main;
    	let raw_value = template(/*lec*/ ctx[1]) + "";
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div3 = element("div");
    			div1 = element("div");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t0 = space();
    			div2 = element("div");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t1 = space();
    			main = element("main");
    			attr_dev(path0, "d", "M20 30 L8 16 20 2");
    			add_location(path0, file$d, 73, 14, 1657);
    			attr_dev(svg0, "viewBox", "0 0 32 32");
    			attr_dev(svg0, "class", "p-5 rx-5 svelte-1g91a9s");
    			attr_dev(svg0, "bg", "e66-c26");
    			add_location(svg0, file$d, 72, 12, 1587);
    			attr_dev(div1, "class", "po-abs");
    			set_style(div1, "left", "5px");
    			set_style(div1, "top", "150px");
    			add_location(div1, file$d, 68, 10, 1462);
    			attr_dev(path1, "d", "M12 30 L24 16 12 2");
    			add_location(path1, file$d, 81, 14, 1929);
    			attr_dev(svg1, "viewBox", "0 0 32 32");
    			attr_dev(svg1, "class", "p-5 rx-5 svelte-1g91a9s");
    			attr_dev(svg1, "bg", "e66-c26");
    			add_location(svg1, file$d, 80, 12, 1859);
    			attr_dev(div2, "class", "po-abs");
    			set_style(div2, "right", "5px");
    			set_style(div2, "top", "150px");
    			add_location(div2, file$d, 76, 10, 1734);
    			attr_dev(div3, "class", "po-rel h-100");
    			add_location(div3, file$d, 67, 8, 1425);
    			attr_dev(main, "class", "fader svelte-1g91a9s");
    			add_location(main, file$d, 85, 8, 2020);
    			attr_dev(div0, "class", "lecture po-rel w-100 svelte-1g91a9s");
    			attr_dev(div0, "slot", "body");
    			add_location(div0, file$d, 66, 6, 1370);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, div3);
    			append_dev(div3, div1);
    			append_dev(div1, svg0);
    			append_dev(svg0, path0);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, svg1);
    			append_dev(svg1, path1);
    			append_dev(div0, t1);
    			append_dev(div0, main);
    			main.innerHTML = raw_value;
    			/*main_binding*/ ctx[5](main);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div1, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(div2, "click", /*click_handler_1*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*lec*/ 2 && raw_value !== (raw_value = template(/*lec*/ ctx[1]) + "")) main.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			/*main_binding*/ ctx[5](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot_4.name,
    		type: "slot",
    		source: "(67:6) <div class=\\\"lecture po-rel w-100\\\" slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    // (95:10) {#if !(osc.show === -1)}
    function create_if_block$3(ctx) {
    	let a;
    	let img;
    	let img_src_value;
    	let t0;
    	let div;
    	let t1_value = /*osc*/ ctx[13].title + "";
    	let t1;
    	let t2;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			img = element("img");
    			t0 = space();
    			div = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(img, "size", "md-lg");
    			attr_dev(img, "class", "rx-5");
    			if (img.src !== (img_src_value = /*osc*/ ctx[13].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$d, 96, 14, 2377);
    			attr_dev(div, "class", "w-100 tx-c");
    			add_location(div, file$d, 97, 14, 2446);
    			attr_dev(a, "class", "pj m-5 svelte-1g91a9s");
    			attr_dev(a, "href", a_href_value = /*osc*/ ctx[13].repo);
    			add_location(a, file$d, 95, 12, 2328);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, img);
    			append_dev(a, t0);
    			append_dev(a, div);
    			append_dev(div, t1);
    			append_dev(a, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(95:10) {#if !(osc.show === -1)}",
    		ctx
    	});

    	return block;
    }

    // (94:8) {#each data.opensource as osc}
    function create_each_block_1$2(ctx) {
    	let if_block_anchor;
    	let if_block = !(/*osc*/ ctx[13].show === -1) && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (!(/*osc*/ ctx[13].show === -1)) if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(94:8) {#each data.opensource as osc}",
    		ctx
    	});

    	return block;
    }

    // (93:6) <div class="f-wrap jtx-ev" slot="body">
    function create_body_slot_3(ctx) {
    	let div;
    	let each_value_1 = data$3.opensource;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "f-wrap jtx-ev");
    			attr_dev(div, "slot", "body");
    			add_location(div, file$d, 92, 6, 2202);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 0) {
    				each_value_1 = data$3.opensource;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot_3.name,
    		type: "slot",
    		source: "(93:6) <div class=\\\"f-wrap jtx-ev\\\" slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    // (111:10) {#each data.podcast as lnk}
    function create_each_block$5(ctx) {
    	let a;
    	let img;
    	let img_src_value;
    	let t;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			img = element("img");
    			t = space();
    			attr_dev(img, "class", "h-a");
    			if (img.src !== (img_src_value = /*lnk*/ ctx[10].icon)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			set_style(img, "width", "40px");
    			add_location(img, file$d, 112, 14, 2933);
    			attr_dev(a, "href", a_href_value = "https://" + /*lnk*/ ctx[10].link);
    			attr_dev(a, "class", "pcd rx-5 svelte-1g91a9s");
    			add_location(a, file$d, 111, 12, 2872);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, img);
    			append_dev(a, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(111:10) {#each data.podcast as lnk}",
    		ctx
    	});

    	return block;
    }

    // (106:6) <div slot="body">
    function create_body_slot_2$1(ctx) {
    	let div0;
    	let div1;
    	let img;
    	let img_src_value;
    	let t;
    	let div2;
    	let each_value = data$3.podcast;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div1 = element("div");
    			img = element("img");
    			t = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(img, "class", "w-100 rx-5 svelte-1g91a9s");
    			if (img.src !== (img_src_value = "./assets/images/podcast.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$d, 107, 10, 2700);
    			attr_dev(div1, "class", "lecture po-rel w-100 svelte-1g91a9s");
    			add_location(div1, file$d, 106, 8, 2655);
    			attr_dev(div2, "class", "flex p-20 jtx-ev");
    			add_location(div2, file$d, 109, 8, 2791);
    			attr_dev(div0, "slot", "body");
    			add_location(div0, file$d, 105, 6, 2629);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, div1);
    			append_dev(div1, img);
    			append_dev(div0, t);
    			append_dev(div0, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 0) {
    				each_value = data$3.podcast;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div2, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot_2$1.name,
    		type: "slot",
    		source: "(106:6) <div slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    // (124:6) <div slot="body">
    function create_body_slot_1$3(ctx) {
    	let div;
    	let iframe;
    	let iframe_src_value;
    	let t0;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			iframe = element("iframe");
    			t0 = space();
    			p = element("p");
    			p.textContent = "We conducts regular on campus observation sessions, which we are all\n          unfortunately missing out on. This new year, we bring you Celestia's\n          Guide to the Universe! A Virtual Guided Tour through universe, with\n          the help of simulators like Space Engine .";
    			if (iframe.src !== (iframe_src_value = "https://educelestia.herokuapp.com/examples/tor/lens.html")) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "class", "w-100 rx-5");
    			attr_dev(iframe, "title", "GravLensing Sim");
    			attr_dev(iframe, "frameborder", "0");
    			set_style(iframe, "min-height", "300px");
    			add_location(iframe, file$d, 124, 8, 3211);
    			add_location(p, file$d, 130, 8, 3428);
    			attr_dev(div, "slot", "body");
    			add_location(div, file$d, 123, 6, 3185);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, iframe);
    			append_dev(div, t0);
    			append_dev(div, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot_1$3.name,
    		type: "slot",
    		source: "(124:6) <div slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    // (141:6) <p class="tx-j" slot="body">
    function create_body_slot$3(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Paper Presentation is about how you put your theme or present your topic\n        before the audience. They see the manner in which you present your\n        point, the manner in which you put your focus, your introduction style,\n        your language and how promptly and effectively you answer their\n        questions.";
    			attr_dev(p, "class", "tx-j");
    			attr_dev(p, "slot", "body");
    			add_location(p, file$d, 140, 6, 3839);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot$3.name,
    		type: "slot",
    		source: "(141:6) <p class=\\\"tx-j\\\" slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let celestia_page;
    	let section;
    	let h1;
    	let t1;
    	let containr0;
    	let t2;
    	let containr1;
    	let t3;
    	let containr2;
    	let t4;
    	let containr3;
    	let t5;
    	let containr4;
    	let t6;
    	let div;
    	let t8;
    	let mars;
    	let current;

    	containr0 = new Containr({
    			props: {
    				title: "Open Lectures",
    				icon: "lec",
    				bg: "e66-c26",
    				$$slots: { body: [create_body_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	containr1 = new Containr({
    			props: {
    				title: "Open Source",
    				icon: "git",
    				bg: "e6e-954",
    				$$slots: { body: [create_body_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	containr2 = new Containr({
    			props: {
    				title: "Podcast",
    				icon: "cast",
    				bg: "b5e-83c",
    				$$slots: { body: [create_body_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	containr3 = new Containr({
    			props: {
    				title: "Celestia’s Guide to the Universe",
    				icon: "astronaut",
    				bg: "66e-37f",
    				$$slots: { body: [create_body_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	containr4 = new Containr({
    			props: {
    				title: "Paper Presentation",
    				icon: "scroll",
    				bg: "69e-8ae",
    				$$slots: { body: [create_body_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	mars = new Mars({ $$inline: true });

    	const block = {
    		c: function create() {
    			celestia_page = element("celestia-page");
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "Events";
    			t1 = space();
    			create_component(containr0.$$.fragment);
    			t2 = space();
    			create_component(containr1.$$.fragment);
    			t3 = space();
    			create_component(containr2.$$.fragment);
    			t4 = space();
    			create_component(containr3.$$.fragment);
    			t5 = space();
    			create_component(containr4.$$.fragment);
    			t6 = space();
    			div = element("div");
    			div.textContent = " ";
    			t8 = space();
    			create_component(mars.$$.fragment);
    			attr_dev(h1, "class", "tx-c po-stx p-10 z-4");
    			set_style(h1, "top", "0px");
    			attr_dev(h1, "bg", "000-nil");
    			add_location(h1, file$d, 64, 4, 1227);
    			set_style(div, "height", "5em");
    			add_location(div, file$d, 149, 4, 4227);
    			attr_dev(section, "class", "adaptive");
    			add_location(section, file$d, 63, 2, 1196);
    			add_location(celestia_page, file$d, 62, 0, 1178);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_page, anchor);
    			append_dev(celestia_page, section);
    			append_dev(section, h1);
    			append_dev(section, t1);
    			mount_component(containr0, section, null);
    			append_dev(section, t2);
    			mount_component(containr1, section, null);
    			append_dev(section, t3);
    			mount_component(containr2, section, null);
    			append_dev(section, t4);
    			mount_component(containr3, section, null);
    			append_dev(section, t5);
    			mount_component(containr4, section, null);
    			append_dev(section, t6);
    			append_dev(section, div);
    			append_dev(section, t8);
    			mount_component(mars, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const containr0_changes = {};

    			if (dirty & /*$$scope, fader, lec*/ 65539) {
    				containr0_changes.$$scope = { dirty, ctx };
    			}

    			containr0.$set(containr0_changes);
    			const containr1_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				containr1_changes.$$scope = { dirty, ctx };
    			}

    			containr1.$set(containr1_changes);
    			const containr2_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				containr2_changes.$$scope = { dirty, ctx };
    			}

    			containr2.$set(containr2_changes);
    			const containr3_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				containr3_changes.$$scope = { dirty, ctx };
    			}

    			containr3.$set(containr3_changes);
    			const containr4_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				containr4_changes.$$scope = { dirty, ctx };
    			}

    			containr4.$set(containr4_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(containr0.$$.fragment, local);
    			transition_in(containr1.$$.fragment, local);
    			transition_in(containr2.$$.fragment, local);
    			transition_in(containr3.$$.fragment, local);
    			transition_in(containr4.$$.fragment, local);
    			transition_in(mars.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(containr0.$$.fragment, local);
    			transition_out(containr1.$$.fragment, local);
    			transition_out(containr2.$$.fragment, local);
    			transition_out(containr3.$$.fragment, local);
    			transition_out(containr4.$$.fragment, local);
    			transition_out(mars.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(celestia_page);
    			destroy_component(containr0);
    			destroy_component(containr1);
    			destroy_component(containr2);
    			destroy_component(containr3);
    			destroy_component(containr4);
    			destroy_component(mars);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Events", slots, []);

    	let //
    		i = 0,
    		jsons,
    		fader,
    		len = 0,
    		x,
    		lec = base;

    	const go = (dir, fst = 0) => {
    		if (x && fst) clearInterval(x);
    		i = (i + +dir) % len;
    		$$invalidate(1, lec = jsons[i]);
    		return 0;
    	};

    	fetch(sheet).then(r => r.text()).then(r2 => {
    		jsons = JSON.parse(csvtojson(r2)).filter(e => e.featured);
    		$$invalidate(1, [lec, len] = [jsons[i], jsons.length], lec);

    		x = setInterval(
    			() => {
    				$$invalidate(0, fader.style.opacity = 0, fader);

    				setTimeout(
    					() => {
    						go(1);
    						$$invalidate(0, fader.style.opacity = 1, fader);
    					},
    					1000
    				);
    			},
    			5000
    		);

    		return 0;
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Events> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => go(-1, 1);
    	const click_handler_1 = () => go(1, 1);

    	function main_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			fader = $$value;
    			$$invalidate(0, fader);
    		});
    	}

    	$$self.$capture_state = () => ({
    		Mars,
    		data: data$3,
    		Containr,
    		sheet,
    		csvtojson,
    		base,
    		template,
    		i,
    		jsons,
    		fader,
    		len,
    		x,
    		lec,
    		go
    	});

    	$$self.$inject_state = $$props => {
    		if ("i" in $$props) i = $$props.i;
    		if ("jsons" in $$props) jsons = $$props.jsons;
    		if ("fader" in $$props) $$invalidate(0, fader = $$props.fader);
    		if ("len" in $$props) len = $$props.len;
    		if ("x" in $$props) x = $$props.x;
    		if ("lec" in $$props) $$invalidate(1, lec = $$props.lec);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [fader, lec, go, click_handler, click_handler_1, main_binding];
    }

    class Events extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Events",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    var Events$1 = [
    	{
    		title: "March Equinox",
    		date: "20 March 2021",
    		time: "1457 Kolkata/Asia",
    		desc: "The Sun will shine directly on the equator and there will be nearly equal amounts of day and night throughout the world",
    		misc: "This is also the first day of spring (vernal equinox) in the Northern Hemisphere and the first day of fall (autumnal equinox) in the Southern Hemisphere."
    	},
    	{
    		title: "Lyrids Meteor Shower",
    		date: "22 April 2021",
    		time: "All night",
    		desc: "The Lyrids is an average shower, usually producing about 20 meteors per hour at its peak. ",
    		misc: "It is produced by dust particles left behind by comet C/1861 G1 Thatcher, which was discovered in 1861"
    	},
    	{
    		title: "Eta Aquarids Meteor Shower",
    		date: "6 May 2021",
    		time: "All night",
    		desc: "The Eta Aquarids is an above average shower, capable of producing up to 60 meteors per hour at its peak.",
    		misc: "It is produced by dust particles left behind by comet Halley, which has been observed since ancient times."
    	},
    	{
    		title: "Total Lunar Eclipse",
    		date: "26 May 2021",
    		time: "Night",
    		desc: "A total lunar eclipse occurs when the Moon passes completely through the Earth's dark shadow, or umbra. During this type of eclipse, the Moon will gradually get darker and then take on a rusty or blood red color",
    		misc: "The eclipse will be visible throughout the Pacific Ocean and parts of eastern Asia, Japan, Australia, and western North America."
    	},
    	{
    		title: "Annular Solar Eclipse",
    		date: "10 June 2021",
    		time: "Day",
    		desc: "An annular solar eclipse occurs when the Moon is too far away from the Earth to completely cover the Sun. This results in a ring of light around the darkened Moon",
    		misc: "Viewing Regions will be Russia, the Arctic Ocean, western Greenland, and Canada"
    	},
    	{
    		title: "June Solistice",
    		date: "21 June 2021",
    		time: "0851 Kolkata/Asia",
    		desc: " The North Pole of the earth will be tilted toward the Sun, which will have reached its northernmost position in the sky and will be directly over the Tropic of Cancer at 23.44 degrees north latitude",
    		misc: "This is the first day of summer (summer solstice) in the Northern Hemisphere and the first day of winter (winter solstice) in the Southern Hemisphere"
    	},
    	{
    		title: " Delta Aquarids Meteor Showe",
    		date: "29 July 2021",
    		time: "All Day",
    		desc: "The Delta Aquarids is an average shower that can produce up to 20 meteors per hour at its peak",
    		misc: " It is produced by debris left behind by comets Marsden and Kracht"
    	},
    	{
    		title: "Saturn at Opposition",
    		date: "2 Aug 2021",
    		time: "Day",
    		desc: "The ringed planet will be at its closest approach to Earth and its face will be fully illuminated by the Sun",
    		misc: "his is the best time to view and photograph Saturn and its moons"
    	},
    	{
    		title: " Perseids Meteor Shower",
    		date: "13 Aug 2021",
    		time: "1470 Kolkata/Asia",
    		desc: "The Perseids is one of the best meteor showers to observe, producing up to 60 meteors per hour at its peak",
    		misc: " It is produced by comet Swift-Tuttle, which was discovered in 1862"
    	},
    	{
    		title: "Jupiter at Opposition",
    		date: "19 Aug 2021",
    		time: "All Day",
    		desc: " The giant planet will be at its closest approach to Earth and its face will be fully illuminated by the Sun. It will be brighter than any other time of the year and will be visible all night long",
    		misc: "A good pair of binoculars should allow you to see Jupiter's four largest moons, appearing as bright dots on either side of the planet"
    	},
    	{
    		title: "Neptune at Opposition",
    		date: "14 Sep 2021",
    		time: "All Day",
    		desc: " The blue giant planet will be at its closest approach to Earth and its face will be fully illuminated by the Sun. It will be brighter than any other time of the year and will be visible all night long",
    		misc: "Due to its extreme distance from Earth, it will only appear as a tiny blue dot in all but the most powerful telescopes"
    	},
    	{
    		title: "September Equinox",
    		date: "22 Sep 2021",
    		time: "0041 Kolkata/Asia",
    		desc: "The Sun will shine directly on the equator and there will be nearly equal amounts of day and night throughout the world",
    		misc: "This is also the first day of fall (autumnal equinox) in the Northern Hemisphere and the first day of spring (vernal equinox) in the Southern Hemisphere."
    	},
    	{
    		title: "Draconids Meteor Shower",
    		date: "7 Oct 2021",
    		time: "Early evening",
    		desc: " The Draconids is a minor meteor shower producing only about 10 meteors per hour.",
    		misc: " It is produced by dust grains left behind by comet 21P Giacobini-Zinner, which was first discovered in 1900."
    	},
    	{
    		title: "Orionids Meteor Shower",
    		date: "21 Oct 2021",
    		time: "1470 Kolkata/Asia",
    		desc: "The Orionids is an average shower producing up to 20 meteors per hour at its peak",
    		misc: " It is produced by dust grains left behind by comet Halley, which has been known and observed since ancient times"
    	},
    	{
    		title: "Taurids Meteor Shower",
    		date: "4 Nov 2021",
    		time: "All Night",
    		desc: "The Taurids is a long-running minor meteor shower producing only about 5-10 meteors per hour. It is unusual in that it consists of two separate streams",
    		misc: "The first is produced by dust grains left behind by Asteroid 2004 TG10. The second stream is produced by debris left behind by Comet 2P Encke"
    	},
    	{
    		title: "Uranus at Opposition",
    		date: "5 Nov 2021",
    		time: "All Day",
    		desc: "he blue-green planet will be at its closest approach to Earth and its face will be fully illuminated by the Sun. It will be brighter than any other time of the year and will be visible all night long",
    		misc: "This is the best time to view Uranus. Due to its distance, it will only appear as a tiny blue-green dot"
    	},
    	{
    		title: "Leonids Meteor Shower",
    		date: "17 Feb 2021",
    		time: "All Night",
    		desc: "The Leonids is an average shower, producing up to 15 meteors per hour at its peak. This shower is unique in that it has a cyclonic peak about every 33 years where hundreds of meteors per hour can be seen. That last of these occurred in 2001",
    		misc: "The Leonids is produced by dust grains left behind by comet Tempel-Tuttle, which was discovered in 1865"
    	},
    	{
    		title: "Partial Lunar Eclipse",
    		date: "19 Nov 2021",
    		time: "Night",
    		desc: "A partial lunar eclipse occurs when the Moon passes through the Earth's partial shadow, or penumbra, and only a portion of it passes through the darkest shadow, or umbra. During this type of eclipse a part of the Moon will darken as it moves through the Earth's shadow",
    		misc: " The eclipse will be visible throughout most of eastern Russia, Japan, the Pacific Ocean, North America, Mexico, Central America, and parts of western South America"
    	},
    	{
    		title: "Total Solar Eclipse",
    		date: "4 Dec 2021",
    		time: "Day",
    		desc: "A total solar eclipse occurs when the moon completely blocks the Sun, revealing the Sun's beautiful outer atmosphere known as the corona",
    		misc: "The path of totality will for this eclipse will be limited to Antarctica and the southern Atlantic Ocean"
    	},
    	{
    		title: "Geminids Meteor Shower",
    		date: "13 Dec 2021",
    		time: "Evening",
    		desc: "The Geminids is the king of the meteor showers. It is considered by many to be the best shower in the heavens, producing up to 120 multicolored meteors per hour at its peak",
    		misc: "It is produced by debris left behind by an asteroid known as 3200 Phaethon, which was discovered in 1982"
    	},
    	{
    		title: "December Solstice",
    		date: "21 Dec 2021",
    		time: "2120 Kolkata/Asia",
    		desc: "The South Pole of the earth will be tilted toward the Sun, which will have reached its southernmost position in the sky and will be directly over the Tropic of Capricorn at 23.44 degrees south latitude",
    		misc: "This is the first day of winter (winter solstice) in the Northern Hemisphere and the first day of summer (summer solstice) in the Southern Hemisphere"
    	},
    	{
    		title: "Ursids Meteor Shower",
    		date: "22 Dec 2021",
    		time: "Night",
    		desc: "The Ursids is a minor meteor shower producing about 5-10 meteors per hour",
    		misc: " It is produced by dust grains left behind by comet Tuttle, which was first discovered in 1790"
    	}
    ];

    var telescopes = [
    	{
    		title: "Celestron Astromaster 130EQ",
    		img: "./assets/obs/celestron.jpg",
    		star: "f/7.87",
    		range: "18x - 300x"
    	},
    	{
    		title: "Sky-Watcher Dobsonian 8\" Traditional",
    		img: "./assets/obs/dobbynew.jpeg",
    		star: "f/5.9",
    		range: "1x - 409x"
    	},
    	{
    		title: "Sky-Watcher Dobsonian 6\" Traditional",
    		img: "./assets/obs/dobbyold.jpeg",
    		star: "f/7.8",
    		range: "1x - 306x"
    	}
    ];
    var data$4 = {
    	telescopes: telescopes
    };

    /* src/shared/slider.svelte generated by Svelte v3.30.0 */
    const file$e = "src/shared/slider.svelte";
    const get_internal_slot_changes = dirty => ({});
    const get_internal_slot_context = ctx => ({});

    function create_fragment$e(ctx) {
    	let div1;
    	let div0;
    	let div1_style_value;
    	let current;
    	const internal_slot_template = /*#slots*/ ctx[6].internal;
    	const internal_slot = create_slot(internal_slot_template, ctx, /*$$scope*/ ctx[5], get_internal_slot_context);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (internal_slot) internal_slot.c();
    			attr_dev(div0, "class", "content w-100 h-100 z-1");
    			add_location(div0, file$e, 41, 2, 910);
    			attr_dev(div1, "class", "container po-rel svelte-1hohhhy");
    			attr_dev(div1, "style", div1_style_value = `height:${/*height*/ ctx[1]};width:${/*width*/ ctx[0]};background:url(${/*images*/ ctx[2][0]}) no-repeat`);
    			add_location(div1, file$e, 37, 0, 768);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (internal_slot) {
    				internal_slot.m(div0, null);
    			}

    			/*div1_binding*/ ctx[7](div1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (internal_slot) {
    				if (internal_slot.p && dirty & /*$$scope*/ 32) {
    					update_slot(internal_slot, internal_slot_template, ctx, /*$$scope*/ ctx[5], dirty, get_internal_slot_changes, get_internal_slot_context);
    				}
    			}

    			if (!current || dirty & /*height, width, images*/ 7 && div1_style_value !== (div1_style_value = `height:${/*height*/ ctx[1]};width:${/*width*/ ctx[0]};background:url(${/*images*/ ctx[2][0]}) no-repeat`)) {
    				attr_dev(div1, "style", div1_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(internal_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(internal_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (internal_slot) internal_slot.d(detaching);
    			/*div1_binding*/ ctx[7](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Slider", slots, ['internal']);

    	let //
    		{ width = "100%" } = $$props,
    		{ height = "400px" } = $$props,
    		{ speed = 2 } = $$props,
    		{ images = [] } = $$props;

    	let container;
    	images.forEach(img => new Image().src = img);

    	function backgroundSequence() {
    		window.clearTimeout();
    		let k = 0;

    		for (let i = 0; i < images.length; i++) {
    			setTimeout(
    				() => {
    					$$invalidate(3, container.style.background = `url(${images[k]}) no-repeat`, container);
    					$$invalidate(3, container.style.backgroundSize = "cover", container);

    					k + 1 === images.length
    					? setTimeout(backgroundSequence, speed * 1000)
    					: k++;
    				},
    				speed * 1000 * i
    			);
    		}

    		return 0;
    	}

    	onMount(backgroundSequence);
    	const writable_props = ["width", "height", "speed", "images"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Slider> was created with unknown prop '${key}'`);
    	});

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			container = $$value;
    			$$invalidate(3, container);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("width" in $$props) $$invalidate(0, width = $$props.width);
    		if ("height" in $$props) $$invalidate(1, height = $$props.height);
    		if ("speed" in $$props) $$invalidate(4, speed = $$props.speed);
    		if ("images" in $$props) $$invalidate(2, images = $$props.images);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		width,
    		height,
    		speed,
    		images,
    		container,
    		backgroundSequence
    	});

    	$$self.$inject_state = $$props => {
    		if ("width" in $$props) $$invalidate(0, width = $$props.width);
    		if ("height" in $$props) $$invalidate(1, height = $$props.height);
    		if ("speed" in $$props) $$invalidate(4, speed = $$props.speed);
    		if ("images" in $$props) $$invalidate(2, images = $$props.images);
    		if ("container" in $$props) $$invalidate(3, container = $$props.container);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [width, height, images, container, speed, $$scope, slots, div1_binding];
    }

    class Slider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { width: 0, height: 1, speed: 4, images: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slider",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get width() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get speed() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set speed(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get images() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set images(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/obs.svelte generated by Svelte v3.30.0 */
    const file$f = "src/pages/obs.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    function get_each_context_1$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (45:8) {#each data.telescopes as tsc}
    function create_each_block_1$3(ctx) {
    	let image;
    	let current;

    	image = new Image$1({
    			props: {
    				src: /*tsc*/ ctx[5].img,
    				placements: {
    					topRight: /*tsc*/ ctx[5].star + " " + /*tsc*/ ctx[5].range,
    					bottomLeft: /*tsc*/ ctx[5].title
    				}
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(image.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(image, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(image.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(image.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(image, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$3.name,
    		type: "each",
    		source: "(45:8) {#each data.telescopes as tsc}",
    		ctx
    	});

    	return block;
    }

    // (44:6) <div slot="body">
    function create_body_slot_1$4(ctx) {
    	let div;
    	let current;
    	let each_value_1 = data$4.telescopes;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "slot", "body");
    			add_location(div, file$f, 43, 6, 1072);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 0) {
    				each_value_1 = data$4.telescopes;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot_1$4.name,
    		type: "slot",
    		source: "(44:6) <div slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    // (58:8) <div slot="internal" class="w-100 p-20 m-0 flex-col jtx-ct f-wt1 stpty">
    function create_internal_slot_1(ctx) {
    	let div0;
    	let div1;
    	let t1;
    	let p;
    	let t2;
    	let br;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div1 = element("div");
    			div1.textContent = "Astrophotography";
    			t1 = space();
    			p = element("p");
    			t2 = text("Its just what it sounds like. ");
    			br = element("br");
    			set_style(div1, "font-size", "3em");
    			add_location(div1, file$f, 58, 10, 1583);
    			add_location(br, file$f, 59, 57, 1690);
    			attr_dev(p, "class", "f-wt3");
    			add_location(p, file$f, 59, 10, 1643);
    			attr_dev(div0, "slot", "internal");
    			attr_dev(div0, "class", "w-100 p-20 m-0 flex-col jtx-ct f-wt1 stpty svelte-1n8egmd");
    			add_location(div0, file$f, 57, 8, 1500);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, div1);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(p, t2);
    			append_dev(p, br);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_internal_slot_1.name,
    		type: "slot",
    		source: "(58:8) <div slot=\\\"internal\\\" class=\\\"w-100 p-20 m-0 flex-col jtx-ct f-wt1 stpty\\\">",
    		ctx
    	});

    	return block;
    }

    // (70:10) {#if i < 2}
    function create_if_block$4(ctx) {
    	let div;
    	let span;
    	let strong;
    	let t0_value = new Date(/*event*/ ctx[2].date).toLocaleDateString("en-UK", /*options*/ ctx[0]) + "";
    	let t0;
    	let t1;
    	let t2_value = /*event*/ ctx[2].time + "";
    	let t2;
    	let t3;
    	let i;
    	let t4_value = /*event*/ ctx[2].title + "";
    	let t4;
    	let t5;
    	let p;
    	let t6_value = /*event*/ ctx[2].desc + "";
    	let t6;
    	let t7;
    	let br;
    	let t8;
    	let t9_value = /*event*/ ctx[2].misc + "";
    	let t9;
    	let t10;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			strong = element("strong");
    			t0 = text(t0_value);
    			t1 = text(" - ");
    			t2 = text(t2_value);
    			t3 = space();
    			i = element("i");
    			t4 = text(t4_value);
    			t5 = space();
    			p = element("p");
    			t6 = text(t6_value);
    			t7 = space();
    			br = element("br");
    			t8 = space();
    			t9 = text(t9_value);
    			t10 = space();
    			add_location(strong, file$f, 72, 16, 2138);
    			set_style(i, "color", "#eeec");
    			add_location(i, file$f, 74, 16, 2265);
    			set_style(span, "font-size", "1.2em");
    			add_location(span, file$f, 71, 14, 2090);
    			add_location(br, file$f, 76, 30, 2358);
    			add_location(p, file$f, 76, 14, 2342);
    			add_location(div, file$f, 70, 12, 2070);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, strong);
    			append_dev(strong, t0);
    			append_dev(strong, t1);
    			append_dev(strong, t2);
    			append_dev(span, t3);
    			append_dev(span, i);
    			append_dev(i, t4);
    			append_dev(div, t5);
    			append_dev(div, p);
    			append_dev(p, t6);
    			append_dev(p, t7);
    			append_dev(p, br);
    			append_dev(p, t8);
    			append_dev(p, t9);
    			append_dev(div, t10);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(70:10) {#if i < 2}",
    		ctx
    	});

    	return block;
    }

    // (69:8) {#each Events.filter((e) => new Date(e.date) - new Date() > 0) as event, i}
    function create_each_block$6(ctx) {
    	let if_block_anchor;
    	let if_block = /*i*/ ctx[4] < 2 && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*i*/ ctx[4] < 2) if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(69:8) {#each Events.filter((e) => new Date(e.date) - new Date() > 0) as event, i}",
    		ctx
    	});

    	return block;
    }

    // (68:6) <div slot="body">
    function create_body_slot$4(ctx) {
    	let div;
    	let each_value = Events$1.filter(/*func_1*/ ctx[1]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "slot", "body");
    			add_location(div, file$f, 67, 6, 1934);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*Events, Date, options*/ 1) {
    				each_value = Events$1.filter(/*func_1*/ ctx[1]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot$4.name,
    		type: "slot",
    		source: "(68:6) <div slot=\\\"body\\\">",
    		ctx
    	});

    	return block;
    }

    // (89:8) <div slot="internal" class="w-100 p-20 m-0 flex-col f-wt1 stpty">
    function create_internal_slot(ctx) {
    	let div0;
    	let div1;
    	let t1;
    	let p;
    	let t2;
    	let br;
    	let t3;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div1 = element("div");
    			div1.textContent = "Looking Up, All Night";
    			t1 = space();
    			p = element("p");
    			t2 = text("Every Year. All Night. A Fire, Maggi, Telescopes & Stars. ");
    			br = element("br");
    			t3 = text("\n            Lovingly called as \"star party\".");
    			set_style(div1, "font-size", "3em");
    			add_location(div1, file$f, 89, 10, 2725);
    			add_location(br, file$f, 91, 74, 2882);
    			attr_dev(p, "class", "f-wt3");
    			add_location(p, file$f, 90, 10, 2790);
    			attr_dev(div0, "slot", "internal");
    			attr_dev(div0, "class", "w-100 p-20 m-0 flex-col f-wt1 stpty svelte-1n8egmd");
    			add_location(div0, file$f, 88, 8, 2649);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, div1);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(p, t2);
    			append_dev(p, br);
    			append_dev(p, t3);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_internal_slot.name,
    		type: "slot",
    		source: "(89:8) <div slot=\\\"internal\\\" class=\\\"w-100 p-20 m-0 flex-col f-wt1 stpty\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let celestia_page;
    	let section;
    	let h1;
    	let t1;
    	let div;
    	let img;
    	let img_src_value;
    	let t2;
    	let containr0;
    	let t3;
    	let article0;
    	let slidr0;
    	let t4;
    	let containr1;
    	let t5;
    	let article1;
    	let slidr1;
    	let current;

    	containr0 = new Containr({
    			props: {
    				title: "Telescopes",
    				icon: "sat",
    				bg: "66e-37f",
    				$$slots: { body: [create_body_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	slidr0 = new Slider({
    			props: {
    				speed: 4,
    				images: [...Array(5)].map(func),
    				height: "350px",
    				$$slots: { internal: [create_internal_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	containr1 = new Containr({
    			props: {
    				title: "Upcoming in Space",
    				icon: "meteor",
    				bg: "e6e-954",
    				$$slots: { body: [create_body_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	slidr1 = new Slider({
    			props: {
    				speed: 4,
    				images: [...Array(7)].map(func_2),
    				height: "350px",
    				$$slots: { internal: [create_internal_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			celestia_page = element("celestia-page");
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "Observations";
    			t1 = space();
    			div = element("div");
    			img = element("img");
    			t2 = space();
    			create_component(containr0.$$.fragment);
    			t3 = space();
    			article0 = element("article");
    			create_component(slidr0.$$.fragment);
    			t4 = space();
    			create_component(containr1.$$.fragment);
    			t5 = space();
    			article1 = element("article");
    			create_component(slidr1.$$.fragment);
    			attr_dev(h1, "class", "tx-c po-stx p-10 z-4");
    			set_style(h1, "top", "0px");
    			attr_dev(h1, "bg", "000-nil");
    			add_location(h1, file$f, 30, 4, 689);
    			if (img.src !== (img_src_value = "./assets/onthehouse/obsArt.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "size", "max");
    			attr_dev(img, "bg", "0008");
    			attr_dev(img, "class", "rx-max m-10");
    			set_style(img, "box-shadow", "-5px 0 10px 10px #0006");
    			attr_dev(img, "alt", "");
    			add_location(img, file$f, 34, 6, 812);
    			attr_dev(div, "class", "tx-c");
    			add_location(div, file$f, 33, 4, 787);
    			attr_dev(article0, "class", "p-0 m-h-auto bg-cov tx-c");
    			add_location(article0, file$f, 52, 4, 1314);
    			attr_dev(article1, "class", "p-0 m-h-auto bg-cov tx-c");
    			add_location(article1, file$f, 83, 4, 2467);
    			attr_dev(section, "class", "adaptive");
    			add_location(section, file$f, 29, 2, 658);
    			add_location(celestia_page, file$f, 28, 0, 640);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_page, anchor);
    			append_dev(celestia_page, section);
    			append_dev(section, h1);
    			append_dev(section, t1);
    			append_dev(section, div);
    			append_dev(div, img);
    			append_dev(section, t2);
    			mount_component(containr0, section, null);
    			append_dev(section, t3);
    			append_dev(section, article0);
    			mount_component(slidr0, article0, null);
    			append_dev(section, t4);
    			mount_component(containr1, section, null);
    			append_dev(section, t5);
    			append_dev(section, article1);
    			mount_component(slidr1, article1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const containr0_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				containr0_changes.$$scope = { dirty, ctx };
    			}

    			containr0.$set(containr0_changes);
    			const slidr0_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				slidr0_changes.$$scope = { dirty, ctx };
    			}

    			slidr0.$set(slidr0_changes);
    			const containr1_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				containr1_changes.$$scope = { dirty, ctx };
    			}

    			containr1.$set(containr1_changes);
    			const slidr1_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				slidr1_changes.$$scope = { dirty, ctx };
    			}

    			slidr1.$set(slidr1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(containr0.$$.fragment, local);
    			transition_in(slidr0.$$.fragment, local);
    			transition_in(containr1.$$.fragment, local);
    			transition_in(slidr1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(containr0.$$.fragment, local);
    			transition_out(slidr0.$$.fragment, local);
    			transition_out(containr1.$$.fragment, local);
    			transition_out(slidr1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(celestia_page);
    			destroy_component(containr0);
    			destroy_component(slidr0);
    			destroy_component(containr1);
    			destroy_component(slidr1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func = (e, i) => `./assets/obs/astro-ph/${i}.jpeg`;
    const func_2 = (e, i) => `./assets/obs/stpty/${i}.jpg`;

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Obs", slots, []);

    	const options = {
    		weekday: "short",
    		year: "numeric",
    		month: "short",
    		day: "numeric"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Obs> was created with unknown prop '${key}'`);
    	});

    	const func_1 = e => new Date(e.date) - new Date() > 0;

    	$$self.$capture_state = () => ({
    		options,
    		Events: Events$1,
    		data: data$4,
    		Slidr: Slider,
    		Containr,
    		Image: Image$1
    	});

    	return [options, func_1];
    }

    class Obs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Obs",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.30.0 */

    const { console: console_1 } = globals;

    // (46:0) {:else}
    function create_else_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = Home;

    	function switch_props(ctx) {
    		return {
    			props: { changePage: /*changePage*/ ctx[1] },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
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
    					switch_instance = new switch_value(switch_props(ctx));
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
    		source: "(46:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (44:36) 
    function create_if_block_3$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = Proj;

    	function switch_props(ctx) {
    		return { $$inline: true };
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
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(44:36) ",
    		ctx
    	});

    	return block;
    }

    // (42:40) 
    function create_if_block_2$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = Obs;

    	function switch_props(ctx) {
    		return { $$inline: true };
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
    			if (switch_value !== (switch_value = Obs)) {
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
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(42:40) ",
    		ctx
    	});

    	return block;
    }

    // (40:34) 
    function create_if_block_1$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = Events;

    	function switch_props(ctx) {
    		return { $$inline: true };
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
    			if (switch_value !== (switch_value = Events)) {
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
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(40:34) ",
    		ctx
    	});

    	return block;
    }

    // (38:0) {#if currentPage == 'Team'}
    function create_if_block$5(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = Team;

    	function switch_props(ctx) {
    		return { $$inline: true };
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
    			if (switch_value !== (switch_value = Team)) {
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
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(38:0) {#if currentPage == 'Team'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let nav;
    	let t0;
    	let current_block_type_index;
    	let if_block;
    	let t1;
    	let footer;
    	let current;

    	nav = new Nav({
    			props: {
    				pages: /*pages*/ ctx[2],
    				changePage: /*changePage*/ ctx[1],
    				currentPage: /*currentPage*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const if_block_creators = [
    		create_if_block$5,
    		create_if_block_1$1,
    		create_if_block_2$1,
    		create_if_block_3$1,
    		create_else_block
    	];

    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*currentPage*/ ctx[0] == "Team") return 0;
    		if (/*currentPage*/ ctx[0] == "Events") return 1;
    		if (/*currentPage*/ ctx[0] == "Observations") return 2;
    		if (/*currentPage*/ ctx[0] == "Projects") return 3;
    		return 4;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	footer = new Footer({
    			props: {
    				changePage: /*changePage*/ ctx[1],
    				pages: /*pages*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(nav.$$.fragment);
    			t0 = space();
    			if_block.c();
    			t1 = space();
    			create_component(footer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(nav, target, anchor);
    			insert_dev(target, t0, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const nav_changes = {};
    			if (dirty & /*currentPage*/ 1) nav_changes.currentPage = /*currentPage*/ ctx[0];
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
    				if_block.m(t1.parentNode, t1);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(nav, detaching);
    			if (detaching) detach_dev(t0);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let { basePage } = $$props;

    	const changePage = page => {
    		if (typeof page === "string") $$invalidate(0, currentPage = page); else {
    			console.log(document.querySelector("input[name=navigator]:checked").value);
    			$$invalidate(0, currentPage = document.querySelector("input[name=navigator]:checked").value);
    			document.querySelector("#nav").removeAttribute("open");
    		}

    		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    	};

    	const pages = [
    		{ page: "Home", component: Home },
    		{ page: "Team", component: Team },
    		{ page: "Observations", component: Obs },
    		{ page: "Events", component: Events },
    		{ page: "Projects", component: Proj }
    	];

    	const writable_props = ["basePage"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("basePage" in $$props) $$invalidate(3, basePage = $$props.basePage);
    	};

    	$$self.$capture_state = () => ({
    		basePage,
    		Nav,
    		Home,
    		Footer,
    		Team,
    		Proj,
    		Facc: Events,
    		Obs,
    		changePage,
    		pages,
    		currentPage
    	});

    	$$self.$inject_state = $$props => {
    		if ("basePage" in $$props) $$invalidate(3, basePage = $$props.basePage);
    		if ("currentPage" in $$props) $$invalidate(0, currentPage = $$props.currentPage);
    	};

    	let currentPage;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*basePage*/ 8) {
    			 $$invalidate(0, currentPage = basePage);
    		}
    	};

    	return [currentPage, changePage, pages, basePage];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { basePage: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$g.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*basePage*/ ctx[3] === undefined && !("basePage" in props)) {
    			console_1.warn("<App> was created without expected prop 'basePage'");
    		}
    	}

    	get basePage() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basePage(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    let basePage = "Home";
    const allowed = [ "Home", "Team", "Observations", "Events", "Projects" ];
    if ( allowed.includes( redir ) ) basePage = redir;

    var main = new App( {
        target: document.getElementsByTagName( 'main' )[ 0 ],
        props: {
            basePage
        }
    } );

    return main;

}());
