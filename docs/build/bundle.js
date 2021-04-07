
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var file = (function () {
    'use strict';

    function noop() { }
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

    /* src/nav.svelte generated by Svelte v3.30.0 */

    const file = "src/nav.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (12:3) {#each pages as pj, i}
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
    			input.value = input_value_value = /*pj*/ ctx[3].page;
    			input.checked = input_checked_value = /*currentPage*/ ctx[2] === /*pj*/ ctx[3].page ? 1 : 0;
    			attr_dev(input, "class", "svelte-1m31os7");
    			add_location(input, file, 13, 5, 396);
    			attr_dev(label, "for", label_for_value = /*pj*/ ctx[3].page);
    			attr_dev(label, "class", "svelte-1m31os7");
    			add_location(label, file, 19, 5, 528);
    			set_style(li, "animation-delay", /*i*/ ctx[5] / 20 + "s");
    			attr_dev(li, "class", "svelte-1m31os7");
    			add_location(li, file, 12, 4, 352);
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
    		source: "(12:3) {#each pages as pj, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let celestia_nav;
    	let link0;
    	let t0;
    	let link1;
    	let t1;
    	let details;
    	let summary;
    	let t3;
    	let ul;
    	let t4;
    	let li0;
    	let input0;
    	let t5;
    	let label0;
    	let t7;
    	let li1;
    	let input1;
    	let t8;
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
    			celestia_nav = element("celestia-nav");
    			link0 = element("link");
    			t0 = space();
    			link1 = element("link");
    			t1 = space();
    			details = element("details");
    			summary = element("summary");
    			summary.textContent = " ";
    			t3 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			li0 = element("li");
    			input0 = element("input");
    			t5 = space();
    			label0 = element("label");
    			label0.textContent = "Education";
    			t7 = space();
    			li1 = element("li");
    			input1 = element("input");
    			t8 = space();
    			label1 = element("label");
    			label1.textContent = "Blog";
    			attr_dev(link0, "rel", "preconnect");
    			attr_dev(link0, "href", "http://edu.sedscelestia.org");
    			add_location(link0, file, 5, 1, 80);
    			attr_dev(link1, "rel", "preconnect");
    			attr_dev(link1, "href", "http://blog.sedscelestia.org");
    			add_location(link1, file, 6, 1, 142);
    			set_style(summary, "z-index", "9999");
    			attr_dev(summary, "class", "svelte-1m31os7");
    			add_location(summary, file, 9, 2, 227);
    			attr_dev(input0, "type", "radio");
    			attr_dev(input0, "name", "navigator");
    			input0.value = "Education";
    			attr_dev(input0, "class", "svelte-1m31os7");
    			add_location(input0, file, 26, 4, 702);
    			attr_dev(label0, "for", "Education");
    			attr_dev(label0, "class", "svelte-1m31os7");
    			add_location(label0, file, 27, 4, 764);
    			set_style(li0, "animation-delay", "0.2s");
    			attr_dev(li0, "onclick", "window.location.href='http://edu.sedscelestia.org'");
    			attr_dev(li0, "class", "svelte-1m31os7");
    			add_location(li0, file, 22, 3, 591);
    			attr_dev(input1, "type", "radio");
    			attr_dev(input1, "name", "navigator");
    			input1.value = "Blog";
    			attr_dev(input1, "class", "svelte-1m31os7");
    			add_location(input1, file, 33, 4, 930);
    			attr_dev(label1, "for", "Blog");
    			attr_dev(label1, "class", "svelte-1m31os7");
    			add_location(label1, file, 34, 4, 987);
    			set_style(li1, "animation-delay", "0.25s");
    			attr_dev(li1, "onclick", "window.location.href='http://blog.sedscelestia.org'");
    			attr_dev(li1, "class", "svelte-1m31os7");
    			add_location(li1, file, 29, 3, 817);
    			attr_dev(ul, "class", "blur w-100 svelte-1m31os7");
    			add_location(ul, file, 10, 2, 276);
    			attr_dev(details, "id", "nav");
    			attr_dev(details, "class", "svelte-1m31os7");
    			add_location(details, file, 8, 1, 206);
    			add_location(celestia_nav, file, 4, 0, 64);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_nav, anchor);
    			append_dev(celestia_nav, link0);
    			append_dev(celestia_nav, t0);
    			append_dev(celestia_nav, link1);
    			append_dev(celestia_nav, t1);
    			append_dev(celestia_nav, details);
    			append_dev(details, summary);
    			append_dev(details, t3);
    			append_dev(details, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(ul, t4);
    			append_dev(ul, li0);
    			append_dev(li0, input0);
    			append_dev(li0, t5);
    			append_dev(li0, label0);
    			append_dev(ul, t7);
    			append_dev(ul, li1);
    			append_dev(li1, input1);
    			append_dev(li1, t8);
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
    						each_blocks[i].m(ul, t4);
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
    			if (detaching) detach_dev(celestia_nav);
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

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			style = svg_element("style");
    			t0 = text("circle {\n            stroke: #fff;\n        }\n    ");
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
    			add_location(style, file$1, 6, 4, 106);
    			attr_dev(circle0, "id", "m");
    			attr_dev(circle0, "cx", "256");
    			attr_dev(circle0, "cy", "256");
    			attr_dev(circle0, "r", "248");
    			attr_dev(circle0, "stroke-width", "8");
    			attr_dev(circle0, "fill", "#0000");
    			add_location(circle0, file$1, 12, 8, 199);
    			xlink_attr(use, "xlink:href", "#m");
    			add_location(use, file$1, 21, 12, 397);
    			attr_dev(clipPath, "id", "eclipse");
    			add_location(clipPath, file$1, 20, 8, 361);
    			add_location(defs, file$1, 11, 4, 184);
    			attr_dev(circle1, "cx", "256");
    			attr_dev(circle1, "cy", "256");
    			attr_dev(circle1, "r", "248");
    			attr_dev(circle1, "stroke-width", "32");
    			attr_dev(circle1, "fill", "#0000");
    			add_location(circle1, file$1, 25, 4, 519);
    			attr_dev(circle2, "cx", "420");
    			attr_dev(circle2, "cy", "256");
    			attr_dev(circle2, "r", "300");
    			attr_dev(circle2, "fill", "#fff");
    			add_location(circle2, file$1, 27, 8, 629);
    			attr_dev(text0, "y", "290");
    			attr_dev(text0, "x", "160");
    			attr_dev(text0, "fill", "#000");
    			add_location(text0, file$1, 28, 8, 686);
    			attr_dev(g, "clip-path", "url(#eclipse)");
    			add_location(g, file$1, 26, 4, 591);
    			attr_dev(circle3, "cx", "512");
    			attr_dev(circle3, "cy", "256");
    			attr_dev(circle3, "r", "64");
    			attr_dev(circle3, "fill", "#fff");
    			set_style(circle3, "mix-blend-mode", "difference");
    			add_location(circle3, file$1, 30, 4, 745);
    			attr_dev(text1, "y", "290");
    			attr_dev(text1, "x", "595");
    			attr_dev(text1, "fill", "#fff");
    			add_location(text1, file$1, 37, 4, 877);
    			attr_dev(svg, "viewBox", "-6 -8 1096 528");
    			attr_dev(svg, "width", "128px");
    			attr_dev(svg, "font-size", "100");
    			attr_dev(svg, "font-family", "Helvetica");
    			add_location(svg, file$1, 0, 0, 0);
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
    		p: noop,
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

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Logo", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Logo> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Logo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Logo",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/nano/legacy.svelte generated by Svelte v3.30.0 */

    const file$2 = "src/nano/legacy.svelte";

    function create_fragment$2(ctx) {
    	let svg;
    	let defs;
    	let clipPath0;
    	let rect0;
    	let clipPath1;
    	let rect1;
    	let filter;
    	let feGaussianBlur;
    	let feMerge;
    	let feMergeNode0;
    	let feMergeNode1;
    	let mask;
    	let linearGradient;
    	let stop0;
    	let stop1;
    	let text_1;
    	let tspan0;
    	let t0;
    	let t1;
    	let tspan1;
    	let t2;
    	let t3;
    	let tspan2;
    	let t4;
    	let t5;
    	let tspan3;
    	let t6;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			clipPath0 = svg_element("clipPath");
    			rect0 = svg_element("rect");
    			clipPath1 = svg_element("clipPath");
    			rect1 = svg_element("rect");
    			filter = svg_element("filter");
    			feGaussianBlur = svg_element("feGaussianBlur");
    			feMerge = svg_element("feMerge");
    			feMergeNode0 = svg_element("feMergeNode");
    			feMergeNode1 = svg_element("feMergeNode");
    			mask = svg_element("mask");
    			linearGradient = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			stop1 = svg_element("stop");
    			text_1 = svg_element("text");
    			tspan0 = svg_element("tspan");
    			t0 = text("2009");
    			t1 = space();
    			tspan1 = svg_element("tspan");
    			t2 = text("12 YEARS");
    			t3 = space();
    			tspan2 = svg_element("tspan");
    			t4 = text("CELESTIA");
    			t5 = space();
    			tspan3 = svg_element("tspan");
    			t6 = text("2021");
    			attr_dev(rect0, "y", "-16");
    			attr_dev(rect0, "width", "512");
    			attr_dev(rect0, "height", "140");
    			add_location(rect0, file$2, 3, 12, 106);
    			attr_dev(clipPath0, "id", "2009");
    			add_location(clipPath0, file$2, 2, 8, 73);
    			attr_dev(rect1, "y", "350");
    			attr_dev(rect1, "width", "512");
    			attr_dev(rect1, "height", "120");
    			add_location(rect1, file$2, 6, 12, 209);
    			attr_dev(clipPath1, "id", "2020");
    			add_location(clipPath1, file$2, 5, 8, 176);
    			attr_dev(feGaussianBlur, "stdDeviation", "5");
    			attr_dev(feGaussianBlur, "result", "coloredBlur");
    			add_location(feGaussianBlur, file$2, 10, 12, 311);
    			attr_dev(feMergeNode0, "in", "coloredBlur");
    			add_location(feMergeNode0, file$2, 12, 16, 406);
    			attr_dev(feMergeNode1, "in", "SourceGraphic");
    			add_location(feMergeNode1, file$2, 13, 16, 455);
    			add_location(feMerge, file$2, 11, 12, 380);
    			attr_dev(filter, "id", "glow");
    			add_location(filter, file$2, 9, 8, 280);
    			attr_dev(stop0, "offset", "0%");
    			attr_dev(stop0, "stop-color", "#349");
    			add_location(stop0, file$2, 19, 16, 647);
    			attr_dev(stop1, "offset", "100%");
    			attr_dev(stop1, "stop-color", "#35d");
    			add_location(stop1, file$2, 20, 16, 702);
    			attr_dev(linearGradient, "id", "red");
    			attr_dev(linearGradient, "x1", "0");
    			attr_dev(linearGradient, "x2", "0");
    			attr_dev(linearGradient, "y1", "0");
    			attr_dev(linearGradient, "y2", "1");
    			add_location(linearGradient, file$2, 18, 12, 577);
    			attr_dev(mask, "id", "red-gradient");
    			add_location(mask, file$2, 17, 8, 540);
    			add_location(defs, file$2, 1, 4, 58);
    			attr_dev(tspan0, "x", "0");
    			attr_dev(tspan0, "font-size", "185");
    			attr_dev(tspan0, "y", "160");
    			attr_dev(tspan0, "clip-path", "url(#2009)");
    			add_location(tspan0, file$2, 26, 8, 874);
    			attr_dev(tspan1, "x", "0");
    			attr_dev(tspan1, "font-size", "105");
    			attr_dev(tspan1, "y", "220");
    			add_location(tspan1, file$2, 29, 8, 977);
    			attr_dev(tspan2, "x", "0");
    			attr_dev(tspan2, "font-size", "100");
    			attr_dev(tspan2, "dy", "100");
    			add_location(tspan2, file$2, 30, 8, 1039);
    			attr_dev(tspan3, "x", "0");
    			attr_dev(tspan3, "font-size", "185");
    			attr_dev(tspan3, "dy", "120");
    			attr_dev(tspan3, "clip-path", "url(#2020)");
    			add_location(tspan3, file$2, 31, 8, 1102);
    			attr_dev(text_1, "font-size", "100");
    			attr_dev(text_1, "fill", "url(#red)");
    			attr_dev(text_1, "filter", "url(#glow)");
    			add_location(text_1, file$2, 25, 4, 806);
    			attr_dev(svg, "viewBox", "75 0 300 500");
    			attr_dev(svg, "height", "512");
    			attr_dev(svg, "width", "512");
    			add_location(svg, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, defs);
    			append_dev(defs, clipPath0);
    			append_dev(clipPath0, rect0);
    			append_dev(defs, clipPath1);
    			append_dev(clipPath1, rect1);
    			append_dev(defs, filter);
    			append_dev(filter, feGaussianBlur);
    			append_dev(filter, feMerge);
    			append_dev(feMerge, feMergeNode0);
    			append_dev(feMerge, feMergeNode1);
    			append_dev(defs, mask);
    			append_dev(mask, linearGradient);
    			append_dev(linearGradient, stop0);
    			append_dev(linearGradient, stop1);
    			append_dev(svg, text_1);
    			append_dev(text_1, tspan0);
    			append_dev(tspan0, t0);
    			append_dev(text_1, t1);
    			append_dev(text_1, tspan1);
    			append_dev(tspan1, t2);
    			append_dev(text_1, t3);
    			append_dev(text_1, tspan2);
    			append_dev(tspan2, t4);
    			append_dev(text_1, t5);
    			append_dev(text_1, tspan3);
    			append_dev(tspan3, t6);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
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
    	validate_slots("Legacy", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Legacy> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Legacy extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Legacy",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/home.svelte generated by Svelte v3.30.0 */
    const file$3 = "src/components/home.svelte";

    function create_fragment$3(ctx) {
    	let celestia_page;
    	let div1;
    	let div0;
    	let logo;
    	let t0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let article0;
    	let button0;
    	let t3;
    	let button1;
    	let a0;
    	let t5;
    	let div2;
    	let legacy;
    	let t6;
    	let article1;
    	let style;
    	let t8;
    	let a1;
    	let img1;
    	let img1_src_value;
    	let t9;
    	let a2;
    	let img2;
    	let img2_src_value;
    	let t10;
    	let a3;
    	let img3;
    	let img3_src_value;
    	let current;
    	let mounted;
    	let dispose;
    	logo = new Logo({ $$inline: true });
    	legacy = new Legacy({ $$inline: true });

    	const block = {
    		c: function create() {
    			celestia_page = element("celestia-page");
    			div1 = element("div");
    			div0 = element("div");
    			create_component(logo.$$.fragment);
    			t0 = space();
    			img0 = element("img");
    			t1 = space();
    			article0 = element("article");
    			button0 = element("button");
    			button0.textContent = "Projects";
    			t3 = space();
    			button1 = element("button");
    			a0 = element("a");
    			a0.textContent = "Blog";
    			t5 = space();
    			div2 = element("div");
    			create_component(legacy.$$.fragment);
    			t6 = space();
    			article1 = element("article");
    			style = element("style");
    			style.textContent = "a img {\n                width: 100px;\n                height: 100px;\n            }";
    			t8 = space();
    			a1 = element("a");
    			img1 = element("img");
    			t9 = space();
    			a2 = element("a");
    			img2 = element("img");
    			t10 = space();
    			a3 = element("a");
    			img3 = element("img");
    			attr_dev(div0, "class", "logo svelte-1tau1zg");
    			add_location(div0, file$3, 23, 8, 606);
    			attr_dev(img0, "class", "m-0 w-100 svelte-1tau1zg");
    			if (img0.src !== (img0_src_value = "https://images.unsplash.com/photo-" + /*img*/ ctx[1])) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			set_style(img0, "position", "absolute");
    			set_style(img0, "z-index", "-1");
    			add_location(img0, file$3, 26, 8, 669);
    			attr_dev(div1, "class", "image-container p-0 m-0 w-100 svelte-1tau1zg");
    			set_style(div1, "position", "relative");
    			set_style(div1, "height", "500px");
    			add_location(div1, file$3, 19, 4, 493);
    			attr_dev(button0, "class", "p-5px m-10px blur svelte-1tau1zg");
    			add_location(button0, file$3, 34, 8, 931);
    			attr_dev(a0, "href", "http://blog.sedscelestia.org");
    			add_location(a0, file$3, 39, 12, 1111);
    			attr_dev(button1, "class", "p-5px m-10px blur svelte-1tau1zg");
    			add_location(button1, file$3, 38, 8, 1064);
    			attr_dev(article0, "class", "flex w-66 svelte-1tau1zg");
    			set_style(article0, "justify-content", "space-around");
    			add_location(article0, file$3, 33, 4, 857);
    			attr_dev(div2, "class", "m-h-auto");
    			set_style(div2, "width", "512px");
    			add_location(div2, file$3, 42, 4, 1196);
    			add_location(style, file$3, 49, 8, 1385);
    			if (img1.src !== (img1_src_value = "./assets/icons/youtube.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			attr_dev(img1, "class", "svelte-1tau1zg");
    			add_location(img1, file$3, 55, 19, 1524);
    			attr_dev(a1, "href", "");
    			add_location(a1, file$3, 55, 8, 1513);
    			if (img2.src !== (img2_src_value = "./assets/icons/facebook.png")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "");
    			attr_dev(img2, "class", "svelte-1tau1zg");
    			add_location(img2, file$3, 56, 19, 1595);
    			attr_dev(a2, "href", "");
    			add_location(a2, file$3, 56, 8, 1584);
    			if (img3.src !== (img3_src_value = "./assets/icons/instagram.png")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "");
    			attr_dev(img3, "class", "svelte-1tau1zg");
    			add_location(img3, file$3, 57, 19, 1667);
    			attr_dev(a3, "href", "");
    			add_location(a3, file$3, 57, 8, 1656);
    			attr_dev(article1, "class", "p-10px m-h-auto flex w-66 svelte-1tau1zg");
    			set_style(article1, "justify-content", "space-around");
    			add_location(article1, file$3, 45, 4, 1274);
    			set_custom_element_data(celestia_page, "class", "section p-0 m-0 svelte-1tau1zg");
    			add_location(celestia_page, file$3, 18, 0, 449);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_page, anchor);
    			append_dev(celestia_page, div1);
    			append_dev(div1, div0);
    			mount_component(logo, div0, null);
    			append_dev(div1, t0);
    			append_dev(div1, img0);
    			append_dev(celestia_page, t1);
    			append_dev(celestia_page, article0);
    			append_dev(article0, button0);
    			append_dev(article0, t3);
    			append_dev(article0, button1);
    			append_dev(button1, a0);
    			append_dev(celestia_page, t5);
    			append_dev(celestia_page, div2);
    			mount_component(legacy, div2, null);
    			append_dev(celestia_page, t6);
    			append_dev(celestia_page, article1);
    			append_dev(article1, style);
    			append_dev(article1, t8);
    			append_dev(article1, a1);
    			append_dev(a1, img1);
    			append_dev(article1, t9);
    			append_dev(article1, a2);
    			append_dev(a2, img2);
    			append_dev(article1, t10);
    			append_dev(article1, a3);
    			append_dev(a3, img3);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button0, "click", /*click_handler*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*img*/ 2 && img0.src !== (img0_src_value = "https://images.unsplash.com/photo-" + /*img*/ ctx[1])) {
    				attr_dev(img0, "src", img0_src_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(logo.$$.fragment, local);
    			transition_in(legacy.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(logo.$$.fragment, local);
    			transition_out(legacy.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(celestia_page);
    			destroy_component(logo);
    			destroy_component(legacy);
    			mounted = false;
    			dispose();
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
    	validate_slots("Home", slots, []);
    	let { changePage } = $$props;

    	const images = [
    		"1464802686167-b939a6910659",
    		"1419242902214-272b3f66ee7a",
    		"1543722530-d2c3201371e7",
    		"1444703686981-a3abbc4d4fe3",
    		"1419242902214-272b3f66ee7a"
    	];

    	let img = images[0];
    	setInterval(() => $$invalidate(1, img = images[~~(Math.random() * 5)]), 3000);
    	const writable_props = ["changePage"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => changePage("Projects");

    	$$self.$$set = $$props => {
    		if ("changePage" in $$props) $$invalidate(0, changePage = $$props.changePage);
    	};

    	$$self.$capture_state = () => ({ changePage, Logo, Legacy, images, img });

    	$$self.$inject_state = $$props => {
    		if ("changePage" in $$props) $$invalidate(0, changePage = $$props.changePage);
    		if ("img" in $$props) $$invalidate(1, img = $$props.img);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [changePage, img, click_handler];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { changePage: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$3.name
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

    var web = {
    	educelestia: "http://edu.sedscelestia.org/",
    	sedsc: "http://www.sedscelestia.org",
    	sedsi: "https://www.sedsindia.org",
    	sedse: "http://www.sedsearth.org"
    };
    var social = {
    	ig: "https://www.instagram.com/sedscelestia/",
    	fb: "https://www.facebook.com/celestiaclub",
    	git: "https://github.com/SEDSCelestiaBPGC",
    	lin: "https://www.linkedin.com/company/seds-celestia/"
    };
    var content = {
    	blog: "https://bitsgcelestia.wordpress.com",
    	yt: "https://www.youtube.com/channel/UCuZ1RL7Qv5tKaQeWy28qhUw",
    	spotify: "https://open.spotify.com/show/0NKbVLI7LpY6069IUCF6xi?si=nybrolgSQ5u2LoWEkm3U1A&nd=1",
    	radiopub: "https://radiopublic.com/celestia-onair-WeRp1J",
    	gpods: "https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy80NWYzZjAwOC9wb2RjYXN0L3Jzcw==",
    	pocketcast: "https://pca.st/b3mqu7bk",
    	breaker: "https://breaker.audio/celestia-on-air"
    };
    var links = {
    	web: web,
    	social: social,
    	content: content
    };

    /* src/micro/footer.svelte generated by Svelte v3.30.0 */
    const file$4 = "src/micro/footer.svelte";

    function create_fragment$4(ctx) {
    	let celestia_footer;
    	let div5;
    	let h50;
    	let t1;
    	let div0;
    	let t3;
    	let div1;
    	let t5;
    	let div2;
    	let t7;
    	let div3;
    	let t9;
    	let div4;
    	let t11;
    	let div6;
    	let hr0;
    	let t12;
    	let div7;
    	let h51;
    	let t14;
    	let a0;
    	let t15;
    	let a0_href_value;
    	let t16;
    	let br0;
    	let t17;
    	let a1;
    	let t18;
    	let a1_href_value;
    	let t19;
    	let br1;
    	let t20;
    	let a2;
    	let t21;
    	let a2_href_value;
    	let t22;
    	let br2;
    	let t23;
    	let a3;
    	let t24;
    	let a3_href_value;
    	let t25;
    	let div8;
    	let hr1;
    	let t26;
    	let div9;
    	let h52;
    	let t28;
    	let a4;
    	let t29;
    	let a4_href_value;
    	let t30;
    	let br3;
    	let t31;
    	let a5;
    	let t32;
    	let a5_href_value;
    	let t33;
    	let br4;
    	let t34;
    	let a6;
    	let t35;
    	let a6_href_value;
    	let t36;
    	let br5;
    	let t37;
    	let a7;
    	let t38;
    	let a7_href_value;
    	let t39;
    	let br6;
    	let t40;
    	let a8;
    	let t41;
    	let a8_href_value;
    	let t42;
    	let br7;
    	let t43;
    	let a9;
    	let t44;
    	let a9_href_value;
    	let t45;
    	let br8;
    	let t46;
    	let a10;
    	let t47;
    	let a10_href_value;
    	let t48;
    	let div10;
    	let hr2;
    	let t49;
    	let div11;
    	let h53;
    	let t51;
    	let a11;
    	let t52;
    	let a11_href_value;
    	let t53;
    	let br9;
    	let t54;
    	let a12;
    	let t55;
    	let a12_href_value;
    	let t56;
    	let br10;
    	let t57;
    	let a13;
    	let t58;
    	let a13_href_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			celestia_footer = element("celestia-footer");
    			div5 = element("div");
    			h50 = element("h5");
    			h50.textContent = "Sitemap";
    			t1 = space();
    			div0 = element("div");
    			div0.textContent = "Home";
    			t3 = space();
    			div1 = element("div");
    			div1.textContent = "Team";
    			t5 = space();
    			div2 = element("div");
    			div2.textContent = "Facilities";
    			t7 = space();
    			div3 = element("div");
    			div3.textContent = "Observations";
    			t9 = space();
    			div4 = element("div");
    			div4.textContent = "Projects";
    			t11 = space();
    			div6 = element("div");
    			hr0 = element("hr");
    			t12 = space();
    			div7 = element("div");
    			h51 = element("h5");
    			h51.textContent = "Our Accounts";
    			t14 = space();
    			a0 = element("a");
    			t15 = text("Instagram");
    			t16 = space();
    			br0 = element("br");
    			t17 = space();
    			a1 = element("a");
    			t18 = text("Facebook");
    			t19 = space();
    			br1 = element("br");
    			t20 = space();
    			a2 = element("a");
    			t21 = text("Github");
    			t22 = space();
    			br2 = element("br");
    			t23 = space();
    			a3 = element("a");
    			t24 = text("LinkedIn");
    			t25 = space();
    			div8 = element("div");
    			hr1 = element("hr");
    			t26 = space();
    			div9 = element("div");
    			h52 = element("h5");
    			h52.textContent = "Our Content";
    			t28 = space();
    			a4 = element("a");
    			t29 = text("Youtube");
    			t30 = space();
    			br3 = element("br");
    			t31 = space();
    			a5 = element("a");
    			t32 = text("Blog");
    			t33 = space();
    			br4 = element("br");
    			t34 = space();
    			a6 = element("a");
    			t35 = text("Spotify");
    			t36 = space();
    			br5 = element("br");
    			t37 = space();
    			a7 = element("a");
    			t38 = text("Radio Public");
    			t39 = space();
    			br6 = element("br");
    			t40 = space();
    			a8 = element("a");
    			t41 = text("Google Podcasts");
    			t42 = space();
    			br7 = element("br");
    			t43 = space();
    			a9 = element("a");
    			t44 = text("Pocketcast");
    			t45 = space();
    			br8 = element("br");
    			t46 = space();
    			a10 = element("a");
    			t47 = text("Breaker");
    			t48 = space();
    			div10 = element("div");
    			hr2 = element("hr");
    			t49 = space();
    			div11 = element("div");
    			h53 = element("h5");
    			h53.textContent = "External Links";
    			t51 = space();
    			a11 = element("a");
    			t52 = text("SEDS Celestia Edu");
    			t53 = space();
    			br9 = element("br");
    			t54 = space();
    			a12 = element("a");
    			t55 = text("SEDS India");
    			t56 = space();
    			br10 = element("br");
    			t57 = space();
    			a13 = element("a");
    			t58 = text("SEDS Earth");
    			add_location(h50, file$4, 8, 8, 155);
    			add_location(div0, file$4, 9, 8, 180);
    			add_location(div1, file$4, 10, 8, 240);
    			add_location(div2, file$4, 11, 8, 300);
    			add_location(div3, file$4, 12, 8, 372);
    			add_location(div4, file$4, 13, 8, 448);
    			add_location(div5, file$4, 7, 4, 141);
    			add_location(hr0, file$4, 16, 8, 550);
    			attr_dev(div6, "class", "flex");
    			add_location(div6, file$4, 15, 4, 523);
    			add_location(h51, file$4, 19, 8, 586);
    			attr_dev(a0, "href", a0_href_value = links.social.ig);
    			add_location(a0, file$4, 20, 8, 616);
    			add_location(br0, file$4, 20, 48, 656);
    			attr_dev(a1, "href", a1_href_value = links.social.fb);
    			add_location(a1, file$4, 21, 8, 671);
    			add_location(br1, file$4, 21, 47, 710);
    			attr_dev(a2, "href", a2_href_value = links.social.git);
    			add_location(a2, file$4, 22, 8, 725);
    			add_location(br2, file$4, 22, 46, 763);
    			attr_dev(a3, "href", a3_href_value = links.social.lin);
    			add_location(a3, file$4, 23, 8, 778);
    			add_location(div7, file$4, 18, 4, 572);
    			add_location(hr1, file$4, 26, 8, 860);
    			attr_dev(div8, "class", "flex");
    			add_location(div8, file$4, 25, 4, 833);
    			add_location(h52, file$4, 29, 8, 896);
    			attr_dev(a4, "href", a4_href_value = links.content.yt);
    			add_location(a4, file$4, 30, 8, 925);
    			add_location(br3, file$4, 30, 47, 964);
    			attr_dev(a5, "href", a5_href_value = links.content.blog);
    			add_location(a5, file$4, 31, 8, 979);
    			add_location(br4, file$4, 31, 46, 1017);
    			attr_dev(a6, "href", a6_href_value = links.content.spotify);
    			add_location(a6, file$4, 32, 8, 1032);
    			add_location(br5, file$4, 32, 52, 1076);
    			attr_dev(a7, "href", a7_href_value = links.content.radiopub);
    			add_location(a7, file$4, 33, 8, 1091);
    			add_location(br6, file$4, 33, 58, 1141);
    			attr_dev(a8, "href", a8_href_value = links.content.gpods);
    			add_location(a8, file$4, 34, 8, 1156);
    			add_location(br7, file$4, 34, 58, 1206);
    			attr_dev(a9, "href", a9_href_value = links.content.pocketcast);
    			add_location(a9, file$4, 35, 8, 1221);
    			add_location(br8, file$4, 35, 58, 1271);
    			attr_dev(a10, "href", a10_href_value = links.content.breaker);
    			add_location(a10, file$4, 36, 8, 1286);
    			add_location(div9, file$4, 28, 4, 882);
    			add_location(hr2, file$4, 39, 8, 1372);
    			attr_dev(div10, "class", "flex");
    			add_location(div10, file$4, 38, 4, 1345);
    			add_location(h53, file$4, 42, 8, 1408);
    			attr_dev(a11, "href", a11_href_value = links.web.educelestia);
    			add_location(a11, file$4, 43, 8, 1440);
    			add_location(br9, file$4, 43, 62, 1494);
    			attr_dev(a12, "href", a12_href_value = links.web.sedsi);
    			add_location(a12, file$4, 44, 8, 1509);
    			add_location(br10, file$4, 44, 49, 1550);
    			attr_dev(a13, "href", a13_href_value = links.web.sedse);
    			add_location(a13, file$4, 45, 8, 1565);
    			add_location(div11, file$4, 41, 4, 1394);
    			set_custom_element_data(celestia_footer, "class", "footer flex p-20px svelte-a6yuqk");
    			add_location(celestia_footer, file$4, 6, 0, 92);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_footer, anchor);
    			append_dev(celestia_footer, div5);
    			append_dev(div5, h50);
    			append_dev(div5, t1);
    			append_dev(div5, div0);
    			append_dev(div5, t3);
    			append_dev(div5, div1);
    			append_dev(div5, t5);
    			append_dev(div5, div2);
    			append_dev(div5, t7);
    			append_dev(div5, div3);
    			append_dev(div5, t9);
    			append_dev(div5, div4);
    			append_dev(celestia_footer, t11);
    			append_dev(celestia_footer, div6);
    			append_dev(div6, hr0);
    			append_dev(celestia_footer, t12);
    			append_dev(celestia_footer, div7);
    			append_dev(div7, h51);
    			append_dev(div7, t14);
    			append_dev(div7, a0);
    			append_dev(a0, t15);
    			append_dev(div7, t16);
    			append_dev(div7, br0);
    			append_dev(div7, t17);
    			append_dev(div7, a1);
    			append_dev(a1, t18);
    			append_dev(div7, t19);
    			append_dev(div7, br1);
    			append_dev(div7, t20);
    			append_dev(div7, a2);
    			append_dev(a2, t21);
    			append_dev(div7, t22);
    			append_dev(div7, br2);
    			append_dev(div7, t23);
    			append_dev(div7, a3);
    			append_dev(a3, t24);
    			append_dev(celestia_footer, t25);
    			append_dev(celestia_footer, div8);
    			append_dev(div8, hr1);
    			append_dev(celestia_footer, t26);
    			append_dev(celestia_footer, div9);
    			append_dev(div9, h52);
    			append_dev(div9, t28);
    			append_dev(div9, a4);
    			append_dev(a4, t29);
    			append_dev(div9, t30);
    			append_dev(div9, br3);
    			append_dev(div9, t31);
    			append_dev(div9, a5);
    			append_dev(a5, t32);
    			append_dev(div9, t33);
    			append_dev(div9, br4);
    			append_dev(div9, t34);
    			append_dev(div9, a6);
    			append_dev(a6, t35);
    			append_dev(div9, t36);
    			append_dev(div9, br5);
    			append_dev(div9, t37);
    			append_dev(div9, a7);
    			append_dev(a7, t38);
    			append_dev(div9, t39);
    			append_dev(div9, br6);
    			append_dev(div9, t40);
    			append_dev(div9, a8);
    			append_dev(a8, t41);
    			append_dev(div9, t42);
    			append_dev(div9, br7);
    			append_dev(div9, t43);
    			append_dev(div9, a9);
    			append_dev(a9, t44);
    			append_dev(div9, t45);
    			append_dev(div9, br8);
    			append_dev(div9, t46);
    			append_dev(div9, a10);
    			append_dev(a10, t47);
    			append_dev(celestia_footer, t48);
    			append_dev(celestia_footer, div10);
    			append_dev(div10, hr2);
    			append_dev(celestia_footer, t49);
    			append_dev(celestia_footer, div11);
    			append_dev(div11, h53);
    			append_dev(div11, t51);
    			append_dev(div11, a11);
    			append_dev(a11, t52);
    			append_dev(div11, t53);
    			append_dev(div11, br9);
    			append_dev(div11, t54);
    			append_dev(div11, a12);
    			append_dev(a12, t55);
    			append_dev(div11, t56);
    			append_dev(div11, br10);
    			append_dev(div11, t57);
    			append_dev(div11, a13);
    			append_dev(a13, t58);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*click_handler*/ ctx[1], false, false, false),
    					listen_dev(div1, "click", /*click_handler_1*/ ctx[2], false, false, false),
    					listen_dev(div2, "click", /*click_handler_2*/ ctx[3], false, false, false),
    					listen_dev(div3, "click", /*click_handler_3*/ ctx[4], false, false, false),
    					listen_dev(div4, "click", /*click_handler_4*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(celestia_footer);
    			mounted = false;
    			run_all(dispose);
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
    	validate_slots("Footer", slots, []);
    	let { changePage } = $$props;
    	const writable_props = ["changePage"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => changePage("Home");
    	const click_handler_1 = () => changePage("Team");
    	const click_handler_2 = () => changePage("Facilities");
    	const click_handler_3 = () => changePage("Observations");
    	const click_handler_4 = () => changePage("Projects");

    	$$self.$$set = $$props => {
    		if ("changePage" in $$props) $$invalidate(0, changePage = $$props.changePage);
    	};

    	$$self.$capture_state = () => ({ changePage, links });

    	$$self.$inject_state = $$props => {
    		if ("changePage" in $$props) $$invalidate(0, changePage = $$props.changePage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		changePage,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { changePage: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*changePage*/ ctx[0] === undefined && !("changePage" in props)) {
    			console.warn("<Footer> was created without expected prop 'changePage'");
    		}
    	}

    	get changePage() {
    		throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set changePage(value) {
    		throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/micro/earth.svelte generated by Svelte v3.30.0 */

    const file$5 = "src/micro/earth.svelte";

    function create_fragment$5(ctx) {
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
    			add_location(div0, file$5, 211, 12, 4342);
    			attr_dev(div1, "class", "earth__shadow-container svelte-a558kv");
    			add_location(div1, file$5, 210, 8, 4292);
    			attr_dev(div2, "class", "clouds__group-1 svelte-a558kv");
    			add_location(div2, file$5, 214, 12, 4428);
    			attr_dev(div3, "class", "clouds__group-2 svelte-a558kv");
    			add_location(div3, file$5, 215, 12, 4472);
    			attr_dev(div4, "class", "clouds svelte-a558kv");
    			add_location(div4, file$5, 213, 8, 4395);
    			attr_dev(div5, "class", "trees__group-1 svelte-a558kv");
    			add_location(div5, file$5, 218, 12, 4559);
    			attr_dev(div6, "class", "trees__group-2 svelte-a558kv");
    			add_location(div6, file$5, 219, 12, 4602);
    			attr_dev(div7, "class", "trees svelte-a558kv");
    			add_location(div7, file$5, 217, 8, 4527);
    			attr_dev(div8, "class", "earth svelte-a558kv");
    			add_location(div8, file$5, 209, 4, 4264);
    			attr_dev(div9, "class", "earth-aura svelte-a558kv");
    			add_location(div9, file$5, 222, 4, 4663);
    			attr_dev(div10, "class", "wrapper svelte-a558kv");
    			add_location(div10, file$5, 208, 0, 4238);
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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
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
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Earth",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    var mgmt = [
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Hrutwick Sawant",
    		pos: "President"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Harshvardhan C.",
    		pos: "Vice President"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Paurush Punyasheel",
    		pos: "Secretary"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Ankit Verma",
    		pos: "Head of Projects"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Bhuvan S V",
    		pos: "Head of Lectures"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Murudkar Kaustubh",
    		pos: "Head of Observations"
    	}
    ];
    var leads = [
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "3 Sided Coin",
    		pos: "Neil Shah"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Quantum Chess",
    		pos: "Ayushi Dubal"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Einsat",
    		pos: "Ankit Verma"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Cloud Chamber",
    		pos: "Vivek S."
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Binary Calculator",
    		pos: "Yash Pathak"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "CanSat",
    		pos: "Dhruv Patidar"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Star Tracker",
    		pos: "Koi to Tha"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Comet Trail Sim",
    		pos: "Yashee Sinha"
    	},
    	{
    		img: "https://qph.fs.quoracdn.net/main-thumb-1474256113-200-qqzalnbnbjkphucworqwkaudsgdbhvbl.jpeg",
    		name: "Rocketry",
    		pos: "Venugopalan Iyenger"
    	}
    ];
    var data = {
    	mgmt: mgmt,
    	leads: leads
    };

    /* src/components/team.svelte generated by Svelte v3.30.0 */
    const file$6 = "src/components/team.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (34:16) {#each data.mgmt as p}
    function create_each_block_1(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let br0;
    	let t1;
    	let span;
    	let t2_value = /*p*/ ctx[0].name + "";
    	let t2;
    	let t3;
    	let br1;
    	let t4_value = /*p*/ ctx[0].pos + "";
    	let t4;
    	let t5;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			br0 = element("br");
    			t1 = space();
    			span = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			br1 = element("br");
    			t4 = text(t4_value);
    			t5 = space();
    			if (img.src !== (img_src_value = /*p*/ ctx[0].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-w6ml1m");
    			add_location(img, file$6, 35, 24, 3986);
    			add_location(br0, file$6, 36, 24, 4037);
    			attr_dev(span, "class", "f-wt6");
    			set_style(span, "color", "#18f");
    			add_location(span, file$6, 37, 24, 4068);
    			add_location(br1, file$6, 40, 24, 4201);
    			attr_dev(div, "class", "imgCont f-wt4 svelte-w6ml1m");
    			add_location(div, file$6, 34, 20, 3934);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, br0);
    			append_dev(div, t1);
    			append_dev(div, span);
    			append_dev(span, t2);
    			append_dev(div, t3);
    			append_dev(div, br1);
    			append_dev(div, t4);
    			append_dev(div, t5);
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
    		source: "(34:16) {#each data.mgmt as p}",
    		ctx
    	});

    	return block;
    }

    // (56:16) {#each data.leads as p}
    function create_each_block$1(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let br0;
    	let t1;
    	let span;
    	let t2_value = /*p*/ ctx[0].pos + "";
    	let t2;
    	let t3;
    	let br1;
    	let t4_value = /*p*/ ctx[0].name + "";
    	let t4;
    	let t5;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			br0 = element("br");
    			t1 = space();
    			span = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			br1 = element("br");
    			t4 = text(t4_value);
    			t5 = space();
    			if (img.src !== (img_src_value = /*p*/ ctx[0].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-w6ml1m");
    			add_location(img, file$6, 57, 24, 5145);
    			add_location(br0, file$6, 58, 24, 5196);
    			attr_dev(span, "class", "f-wt6");
    			set_style(span, "color", "#f75");
    			add_location(span, file$6, 59, 24, 5227);
    			add_location(br1, file$6, 62, 24, 5359);
    			attr_dev(div, "class", "imgCont f-wt4 svelte-w6ml1m");
    			add_location(div, file$6, 56, 20, 5093);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, br0);
    			append_dev(div, t1);
    			append_dev(div, span);
    			append_dev(span, t2);
    			append_dev(div, t3);
    			append_dev(div, br1);
    			append_dev(div, t4);
    			append_dev(div, t5);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(56:16) {#each data.leads as p}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let celestia_page;
    	let section;
    	let article0;
    	let h10;
    	let span0;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let t5;
    	let p2;
    	let t7;
    	let article1;
    	let h11;
    	let span1;
    	let t9;
    	let svg0;
    	let path0;
    	let t10;
    	let div0;
    	let t11;
    	let article2;
    	let h12;
    	let span2;
    	let t13;
    	let svg1;
    	let path1;
    	let t14;
    	let div1;
    	let t15;
    	let earth;
    	let current;
    	let each_value_1 = data.mgmt;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = data.leads;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	earth = new Earth({ $$inline: true });

    	const block = {
    		c: function create() {
    			celestia_page = element("celestia-page");
    			section = element("section");
    			article0 = element("article");
    			h10 = element("h1");
    			span0 = element("span");
    			span0.textContent = "SEDS Celestia";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "SEDS Celestia is a chapter that is a part of SEDS India,\n                headquartered in VIT Vellore. The international headquarters of\n                SEDS lies in MIT, Boston, USA.";
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "People think that we Celestials just observe the “stars and the\n                planets” in the night sky. That’s partially correct. We do much\n                more than star gazing. We organise lectures by various eminent\n                professors, undertake many projects, exhibitions during quark,\n                bonhomie with seniors and Starparty!";
    			t5 = space();
    			p2 = element("p");
    			p2.textContent = "We are the Celestials!";
    			t7 = space();
    			article1 = element("article");
    			h11 = element("h1");
    			span1 = element("span");
    			span1.textContent = "Management";
    			t9 = space();
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t10 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t11 = space();
    			article2 = element("article");
    			h12 = element("h1");
    			span2 = element("span");
    			span2.textContent = "Leads";
    			t13 = space();
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t14 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t15 = space();
    			create_component(earth.$$.fragment);
    			add_location(span0, file$6, 8, 38, 195);
    			attr_dev(h10, "class", "l1 flex f-wt5 svelte-w6ml1m");
    			add_location(h10, file$6, 8, 12, 169);
    			attr_dev(p0, "class", "tx-j svelte-w6ml1m");
    			add_location(p0, file$6, 9, 12, 239);
    			attr_dev(p1, "class", "tx-j svelte-w6ml1m");
    			add_location(p1, file$6, 14, 12, 485);
    			attr_dev(p2, "class", "tx-j svelte-w6ml1m");
    			add_location(p2, file$6, 21, 12, 902);
    			attr_dev(article0, "class", "svelte-w6ml1m");
    			add_location(article0, file$6, 7, 8, 147);
    			add_location(span1, file$6, 25, 16, 1037);
    			attr_dev(path0, "d", "M249.86 33.48v26.07C236.28 80.17 226 168.14 225.39 274.9c11.74-15.62 19.13-33.33 19.13-48.24v-16.88c-.03-5.32.75-10.53 2.19-15.65.65-2.14 1.39-4.08 2.62-5.82 1.23-1.75 3.43-3.79 6.68-3.79 3.24 0 5.45 2.05 6.68 3.79 1.23 1.75 1.97 3.68 2.62 5.82 1.44 5.12 2.22 10.33 2.19 15.65v16.88c0 14.91 7.39 32.62 19.13 48.24-.63-106.76-10.91-194.73-24.49-215.35V33.48h-12.28zm-26.34 147.77c-9.52 2.15-18.7 5.19-27.46 9.08 8.9 16.12 9.76 32.64 1.71 37.29-8 4.62-21.85-4.23-31.36-19.82-11.58 8.79-21.88 19.32-30.56 31.09 14.73 9.62 22.89 22.92 18.32 30.66-4.54 7.7-20.03 7.14-35.47-.96-5.78 13.25-9.75 27.51-11.65 42.42 9.68.18 18.67 2.38 26.18 6.04 17.78-.3 32.77-1.96 40.49-4.22 5.55-26.35 23.02-48.23 46.32-59.51.73-25.55 1.88-49.67 3.48-72.07zm64.96 0c1.59 22.4 2.75 46.52 3.47 72.07 23.29 11.28 40.77 33.16 46.32 59.51 7.72 2.26 22.71 3.92 40.49 4.22 7.51-3.66 16.5-5.85 26.18-6.04-1.9-14.91-5.86-29.17-11.65-42.42-15.44 8.1-30.93 8.66-35.47.96-4.57-7.74 3.6-21.05 18.32-30.66-8.68-11.77-18.98-22.3-30.56-31.09-9.51 15.59-23.36 24.44-31.36 19.82-8.05-4.65-7.19-21.16 1.71-37.29a147.49 147.49 0 0 0-27.45-9.08zm-32.48 8.6c-3.23 0-5.86 8.81-6.09 19.93h-.05v16.88c0 41.42-49.01 95.04-93.49 95.04-52 0-122.75-1.45-156.37 29.17v2.51c9.42 17.12 20.58 33.17 33.18 47.97C45.7 380.26 84.77 360.4 141.2 360c45.68 1.02 79.03 20.33 90.76 40.87.01.01-.01.04 0 .05 7.67 2.14 15.85 3.23 24.04 3.21 8.19.02 16.37-1.07 24.04-3.21.01-.01-.01-.04 0-.05 11.74-20.54 45.08-39.85 90.76-40.87 56.43.39 95.49 20.26 108.02 41.35 12.6-14.8 23.76-30.86 33.18-47.97v-2.51c-33.61-30.62-104.37-29.17-156.37-29.17-44.48 0-93.49-53.62-93.49-95.04v-16.88h-.05c-.23-11.12-2.86-19.93-6.09-19.93zm0 96.59c22.42 0 40.6 18.18 40.6 40.6s-18.18 40.65-40.6 40.65-40.6-18.23-40.6-40.65c0-22.42 18.18-40.6 40.6-40.6zm0 7.64c-18.19 0-32.96 14.77-32.96 32.96S237.81 360 256 360s32.96-14.77 32.96-32.96-14.77-32.96-32.96-32.96zm0 6.14c14.81 0 26.82 12.01 26.82 26.82s-12.01 26.82-26.82 26.82-26.82-12.01-26.82-26.82 12.01-26.82 26.82-26.82zm-114.8 66.67c-10.19.07-21.6.36-30.5 1.66.43 4.42 1.51 18.63 7.11 29.76 9.11-2.56 18.36-3.9 27.62-3.9 41.28.94 71.48 34.35 78.26 74.47l.11 4.7c10.4 1.91 21.19 2.94 32.21 2.94 11.03 0 21.81-1.02 32.21-2.94l.11-4.7c6.78-40.12 36.98-73.53 78.26-74.47 9.26 0 18.51 1.34 27.62 3.9 5.6-11.13 6.68-25.34 7.11-29.76-8.9-1.3-20.32-1.58-30.5-1.66-18.76.42-35.19 4.17-48.61 9.67-12.54 16.03-29.16 30.03-49.58 33.07-.09.02-.17.04-.27.05-.05.01-.11.04-.16.05-5.24 1.07-10.63 1.6-16.19 1.6-5.55 0-10.95-.53-16.19-1.6-.05-.01-.11-.04-.16-.05-.1-.02-.17-.04-.27-.05-20.42-3.03-37.03-17.04-49.58-33.07-13.42-5.49-29.86-9.25-48.61-9.67z");
    			add_location(path0, file$6, 27, 21, 1125);
    			attr_dev(svg0, "viewBox", "0 0 512 512");
    			add_location(svg0, file$6, 26, 16, 1077);
    			attr_dev(h11, "class", "l1 flex f-wt5 svelte-w6ml1m");
    			add_location(h11, file$6, 24, 12, 994);
    			attr_dev(div0, "class", "teamrow f-wrap  flex");
    			add_location(div0, file$6, 32, 12, 3840);
    			attr_dev(article1, "class", "svelte-w6ml1m");
    			add_location(article1, file$6, 23, 8, 972);
    			add_location(span2, file$6, 47, 16, 4377);
    			attr_dev(path1, "d", "M399 374c96-122 17-233 17-233 45 86-41 171-41 171 105-171-60-271-60-271 97 73-10 191-10 191 86 158-69 230-69 230s0-17-2-86c4 5 35 36 35 36l-24-47 63-9-63-9 20-55-31 46c-2-88-8-305-8-307v-2 1-1 2c0 1-6 219-8 307l-31-46 20 56-63 9 63 9-24 47 35-36c-2 69-2 86-2 86s-154-72-69-230c0 0-107-118-10-191 0 0-165 100-60 272 0 0-87-85-41-170 0 0-79 111 17 233 0 0-26-16-49-78 0 0 17 183 222 186h4c205-2 222-186 222-186-24 62-50 78-50 78z");
    			add_location(path1, file$6, 49, 21, 4460);
    			attr_dev(svg1, "viewBox", "0 0 448 512");
    			add_location(svg1, file$6, 48, 16, 4412);
    			attr_dev(h12, "class", "l1 flex f-wt5 svelte-w6ml1m");
    			add_location(h12, file$6, 46, 12, 4334);
    			attr_dev(div1, "class", "teamrow f-wrap  flex");
    			add_location(div1, file$6, 54, 12, 4998);
    			attr_dev(article2, "class", "svelte-w6ml1m");
    			add_location(article2, file$6, 45, 8, 4312);
    			attr_dev(section, "class", "svelte-w6ml1m");
    			add_location(section, file$6, 6, 4, 129);
    			add_location(celestia_page, file$6, 5, 0, 109);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_page, anchor);
    			append_dev(celestia_page, section);
    			append_dev(section, article0);
    			append_dev(article0, h10);
    			append_dev(h10, span0);
    			append_dev(article0, t1);
    			append_dev(article0, p0);
    			append_dev(article0, t3);
    			append_dev(article0, p1);
    			append_dev(article0, t5);
    			append_dev(article0, p2);
    			append_dev(section, t7);
    			append_dev(section, article1);
    			append_dev(article1, h11);
    			append_dev(h11, span1);
    			append_dev(h11, t9);
    			append_dev(h11, svg0);
    			append_dev(svg0, path0);
    			append_dev(article1, t10);
    			append_dev(article1, div0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			append_dev(section, t11);
    			append_dev(section, article2);
    			append_dev(article2, h12);
    			append_dev(h12, span2);
    			append_dev(h12, t13);
    			append_dev(h12, svg1);
    			append_dev(svg1, path1);
    			append_dev(article2, t14);
    			append_dev(article2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(section, t15);
    			mount_component(earth, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 0) {
    				each_value_1 = data.mgmt;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*data*/ 0) {
    				each_value = data.leads;
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
    		i: function intro(local) {
    			if (current) return;
    			transition_in(earth.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(earth.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(celestia_page);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			destroy_component(earth);
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

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Team", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Team> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Earth, data });
    	return [];
    }

    class Team extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Team",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/micro/bh.svelte generated by Svelte v3.30.0 */

    const file$7 = "src/micro/bh.svelte";

    function create_fragment$7(ctx) {
    	let div2;
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			attr_dev(div0, "class", "earth__shadow-container svelte-90kt5a");
    			add_location(div0, file$7, 39, 8, 869);
    			attr_dev(div1, "class", "earth svelte-90kt5a");
    			add_location(div1, file$7, 38, 4, 841);
    			attr_dev(div2, "class", "wrapper svelte-90kt5a");
    			add_location(div2, file$7, 37, 0, 815);
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
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
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bh",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    var going = [
    	{
    		name: "EINSat",
    		icon: "https://pbs.twimg.com/media/ETVfqtTX0AAdrtd.jpg",
    		desc: "The CubeSat project of SEDS-Celestia planned to detect exoplanets.",
    		main: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4a8b89eb-212e-48ac-b1d8-0554cbe12ff1/d6gmgh6-541b78b7-6f78-4676-a960-187c12f7575d.jpg/v1/fill/w_622,h_350,q_70,strp/ssv_normandy_sr2__chariot_of_the_gods_by_eddy_shinjuku_d6gmgh6-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xNDQwIiwicGF0aCI6IlwvZlwvNGE4Yjg5ZWItMjEyZS00OGFjLWIxZDgtMDU1NGNiZTEyZmYxXC9kNmdtZ2g2LTU0MWI3OGI3LTZmNzgtNDY3Ni1hOTYwLTE4N2MxMmY3NTc1ZC5qcGciLCJ3aWR0aCI6Ijw9MjU2MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.UibCiAXSMF-wv7Hp4GA_N-cjCq0UqQqtz9M6QbDyr4A",
    		more: "Github",
    		moreLink: "https://me.nukes.in"
    	},
    	{
    		name: "Rocketry",
    		icon: "https://i.imgur.com/eum16Uw.jpg",
    		desc: "Rocketry aims to build a self landing thrust-vector controlled rockets.",
    		main: "https://i.pinimg.com/originals/9b/01/d0/9b01d0fcc29dd6b04e3a9619e6def219.png",
    		more: "500px",
    		moreLink: "https://me.nukes.in"
    	},
    	{
    		name: "Quantum Chess",
    		icon: "https://c4.wallpaperflare.com/wallpaper/627/677/142/shiro-no-game-no-life-sora-no-game-no-life-stephanie-dora-blue-hair-wallpaper-thumb.jpg",
    		desc: "Quantum chess is reiteration of classical chess but with quantum rules.",
    		main: "https://images7.alphacoders.com/740/thumb-1920-740377.png",
    		more: "GitHub",
    		moreLink: "https://me.nukes.in"
    	},
    	{
    		name: "Brain Computer Interface",
    		icon: "https://c4.wallpaperflare.com/wallpaper/627/677/142/shiro-no-game-no-life-sora-no-game-no-life-stephanie-dora-blue-hair-wallpaper-thumb.jpg",
    		desc: "Designing an Ominidirection brain controlled rover",
    		main: "https://images7.alphacoders.com/740/thumb-1920-740377.png",
    		more: "GitHub",
    		moreLink: "https://me.nukes.in"
    	},
    	{
    		name: "Binary Calculator",
    		icon: "https://c4.wallpaperflare.com/wallpaper/627/677/142/shiro-no-game-no-life-sora-no-game-no-life-stephanie-dora-blue-hair-wallpaper-thumb.jpg",
    		desc: "A calculator made by transistor circuits.",
    		main: "https://images7.alphacoders.com/740/thumb-1920-740377.png",
    		more: "GitHub",
    		moreLink: "https://me.nukes.in"
    	},
    	{
    		name: "Cloud Chamber",
    		icon: "https://c4.wallpaperflare.com/wallpaper/627/677/142/shiro-no-game-no-life-sora-no-game-no-life-stephanie-dora-blue-hair-wallpaper-thumb.jpg",
    		desc: "An old school particle detector",
    		main: "https://images7.alphacoders.com/740/thumb-1920-740377.png",
    		more: "GitHub",
    		moreLink: "https://me.nukes.in"
    	},
    	{
    		name: "Comet Dust Trail Simulation",
    		icon: "https://c4.wallpaperflare.com/wallpaper/627/677/142/shiro-no-game-no-life-sora-no-game-no-life-stephanie-dora-blue-hair-wallpaper-thumb.jpg",
    		desc: "Simulating icy comet dust trails.",
    		main: "https://images7.alphacoders.com/740/thumb-1920-740377.png",
    		more: "GitHub",
    		moreLink: "https://me.nukes.in"
    	}
    ];
    var past = [
    	{
    		year: "2019",
    		name: "CanSat",
    		desc: "Designing an atmosphere probining satellite which fits in a can.",
    		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
    		more: "",
    		moreLink: ""
    	},
    	{
    		year: "2019",
    		name: "StarTracker",
    		desc: "An computerized and automated telescope",
    		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
    		more: "",
    		moreLink: ""
    	},
    	{
    		year: "2019",
    		name: "Lidar",
    		desc: "An attempt to create our inhouce lidar",
    		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
    		more: "",
    		moreLink: ""
    	},
    	{
    		year: "2019",
    		name: "Tesla Coil",
    		desc: "The name speaks for itself",
    		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
    		more: "",
    		moreLink: ""
    	},
    	{
    		year: "2019",
    		name: "Microbial Fuel Cell",
    		desc: "Utilizing bacteria in order to catalize reactions and generate current.",
    		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
    		more: "",
    		moreLink: ""
    	},
    	{
    		year: "2019",
    		name: "Pyroboard",
    		desc: "Vibrating a burning gases to tunes from a speaker",
    		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
    		more: "",
    		moreLink: ""
    	},
    	{
    		year: "2019",
    		name: "Spectrometer",
    		desc: "Design a spectrometer to determine the chemical composition of light sources or illuminated objects.",
    		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
    		more: "",
    		moreLink: ""
    	},
    	{
    		year: "2019",
    		name: "Physarum",
    		desc: "Solve basic computation problems using Physarum slime mold",
    		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
    		more: "",
    		moreLink: ""
    	},
    	{
    		year: "2019",
    		name: "Sonoluminescence",
    		desc: "Create a sonoluminescent bubble and take temperature and spectral measurements of the light emitted.",
    		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
    		more: "",
    		moreLink: ""
    	},
    	{
    		year: "",
    		name: "Barn Door Tracker",
    		desc: "Take exposure images of night’s sky using automated DSLR mount",
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
    		desc: "To Visualize pressure, temperature and composition gradients in fluid flow and observe the complex fractal like structures of turbulence.",
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
    		desc: "Build a Michelson interferometer without any expensive equipment and to explore the applications of interferometry in seismology and acoustics.",
    		img: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/06/electronics_inside_a_cansat/16054362-1-eng-GB/Electronics_inside_a_CanSat_article.jpg",
    		more: "",
    		moreLink: ""
    	}
    ];
    var data$1 = {
    	going: going,
    	past: past
    };

    /* src/components/proj.svelte generated by Svelte v3.30.0 */
    const file$8 = "src/components/proj.svelte";

    function get_each_context$2(ctx, list, i) {
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

    // (17:8) {#each data.going as pj}
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
    	let t5;
    	let p;
    	let t6_value = /*pj*/ ctx[3].desc + "";
    	let t6;
    	let t7;
    	let button;
    	let a;
    	let t8_value = /*pj*/ ctx[3].more + "";
    	let t8;
    	let a_href_value;
    	let t9;

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
    			summary.textContent = "Venugopalan Iyengar";
    			t5 = space();
    			p = element("p");
    			t6 = text(t6_value);
    			t7 = space();
    			button = element("button");
    			a = element("a");
    			t8 = text(t8_value);
    			t9 = space();
    			if (img.src !== (img_src_value = /*pj*/ ctx[3].icon)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "w-100 svelte-lzmn1d");
    			attr_dev(img, "alt", img_alt_value = /*pj*/ ctx[3].name);
    			add_location(img, file$8, 18, 16, 509);
    			attr_dev(span, "class", "f-wt7");
    			add_location(span, file$8, 20, 20, 622);
    			add_location(hr, file$8, 21, 20, 679);
    			add_location(summary, file$8, 23, 24, 740);
    			attr_dev(a, "href", a_href_value = /*pj*/ ctx[3].moreLink);
    			add_location(a, file$8, 27, 32, 915);
    			add_location(button, file$8, 26, 28, 874);
    			add_location(p, file$8, 24, 24, 804);
    			add_location(details, file$8, 22, 20, 706);
    			attr_dev(div0, "class", "title p-20px svelte-lzmn1d");
    			add_location(div0, file$8, 19, 16, 575);
    			attr_dev(div1, "class", "boxy tx-l m-20px blur svelte-lzmn1d");
    			add_location(div1, file$8, 17, 12, 457);
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
    			append_dev(details, t5);
    			append_dev(details, p);
    			append_dev(p, t6);
    			append_dev(p, t7);
    			append_dev(p, button);
    			append_dev(button, a);
    			append_dev(a, t8);
    			append_dev(div1, t9);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(17:8) {#each data.going as pj}",
    		ctx
    	});

    	return block;
    }

    // (74:16) {#each data.past.filter((e) => e.name.includes(filter) || e.desc.includes(filter)) as pj, i}
    function create_each_block$2(ctx) {
    	let tr;
    	let td0;
    	let img;
    	let img_src_value;
    	let t0;
    	let td1;
    	let div3;
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
    			tr = element("tr");
    			td0 = element("td");
    			img = element("img");
    			t0 = space();
    			td1 = element("td");
    			div3 = element("div");
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
    			if (img.src !== (img_src_value = /*pj*/ ctx[3].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$8, 75, 40, 2643);
    			attr_dev(td0, "class", "p-0");
    			add_location(td0, file$8, 75, 24, 2627);
    			attr_dev(div0, "class", "f-wt5");
    			set_style(div0, "font-size", "1.2em");
    			add_location(div0, file$8, 79, 36, 2859);
    			add_location(div1, file$8, 82, 36, 3058);
    			attr_dev(div2, "class", "p-5px");
    			add_location(div2, file$8, 78, 32, 2803);
    			attr_dev(div3, "class", "comet m-5px svelte-lzmn1d");
    			add_location(div3, file$8, 77, 28, 2745);
    			attr_dev(td1, "class", "p-0");
    			add_location(td1, file$8, 76, 24, 2700);
    			add_location(tr, file$8, 74, 20, 2598);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, img);
    			append_dev(tr, t0);
    			append_dev(tr, td1);
    			append_dev(td1, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, t3);
    			append_dev(div0, t4);
    			append_dev(div2, t5);
    			append_dev(div2, div1);
    			append_dev(div1, t6);
    			append_dev(tr, t7);
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
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(74:16) {#each data.past.filter((e) => e.name.includes(filter) || e.desc.includes(filter)) as pj, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let celestia_page;
    	let div1;
    	let div0;
    	let t0;
    	let h1;
    	let t2;
    	let hr;
    	let t3;
    	let div2;
    	let t5;
    	let section0;
    	let t6;
    	let section1;
    	let details;
    	let summary;
    	let t7;
    	let i;
    	let t9;
    	let table;
    	let style;
    	let t11;
    	let tr;
    	let td;
    	let input;
    	let t12;
    	let t13;
    	let bh;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_1 = data$1.going;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	let each_value = data$1.past.filter(/*func*/ ctx[2]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	bh = new Bh({ $$inline: true });

    	const block = {
    		c: function create() {
    			celestia_page = element("celestia-page");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			h1 = element("h1");
    			h1.textContent = "Projects";
    			t2 = space();
    			hr = element("hr");
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = " ";
    			t5 = space();
    			section0 = element("section");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t6 = space();
    			section1 = element("section");
    			details = element("details");
    			summary = element("summary");
    			t7 = text("Past Projects ");
    			i = element("i");
    			i.textContent = "(Click to Open)";
    			t9 = space();
    			table = element("table");
    			style = element("style");
    			style.textContent = "tr {\n                        width: 100%;\n                        background: linear-gradient(135deg, #a8f, #8af);\n                    }\n                    td {\n                        justify-content: center;\n                        align-items: center;\n                        height: 100px;\n                    }\n                    td img {\n                        height: 100px;\n                        width: 100px;\n                    }\n                    td input {\n                        background: transparent;\n                        font-size: 2em;\n                        color: #fff;\n                    }\n                    td input::placeholder {\n                        color: #fff8;\n                    }";
    			t11 = space();
    			tr = element("tr");
    			td = element("td");
    			input = element("input");
    			t12 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t13 = space();
    			create_component(bh.$$.fragment);
    			attr_dev(div0, "class", "space__comet svelte-lzmn1d");
    			add_location(div0, file$8, 10, 8, 219);
    			attr_dev(div1, "class", "space__comet-container");
    			set_style(div1, "position", "fixed");
    			add_location(div1, file$8, 9, 4, 150);
    			attr_dev(h1, "class", "w-100 tx-c");
    			add_location(h1, file$8, 12, 4, 263);
    			add_location(hr, file$8, 13, 4, 304);
    			set_style(div2, "height", "400px");
    			add_location(div2, file$8, 14, 4, 315);
    			attr_dev(section0, "class", "flex tx-c svelte-lzmn1d");
    			set_style(section0, "flex-wrap", "wrap");
    			add_location(section0, file$8, 15, 4, 359);
    			add_location(i, file$8, 38, 31, 1269);
    			set_style(summary, "font-size", "20px");
    			add_location(summary, file$8, 37, 12, 1206);
    			add_location(style, file$8, 41, 16, 1351);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "Search");
    			add_location(input, file$8, 66, 24, 2250);
    			attr_dev(td, "colspan", "2");
    			set_style(td, "padding", "0 10px");
    			set_style(td, "height", "50px");
    			add_location(td, file$8, 65, 20, 2173);
    			add_location(tr, file$8, 64, 16, 2148);
    			add_location(table, file$8, 40, 12, 1327);
    			add_location(details, file$8, 36, 8, 1184);
    			attr_dev(section1, "class", "tx-l svelte-lzmn1d");
    			set_style(section1, "overflow-x", "scroll");
    			add_location(section1, file$8, 35, 4, 1126);
    			add_location(celestia_page, file$8, 8, 0, 130);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_page, anchor);
    			append_dev(celestia_page, div1);
    			append_dev(div1, div0);
    			append_dev(celestia_page, t0);
    			append_dev(celestia_page, h1);
    			append_dev(celestia_page, t2);
    			append_dev(celestia_page, hr);
    			append_dev(celestia_page, t3);
    			append_dev(celestia_page, div2);
    			append_dev(celestia_page, t5);
    			append_dev(celestia_page, section0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(section0, null);
    			}

    			append_dev(celestia_page, t6);
    			append_dev(celestia_page, section1);
    			append_dev(section1, details);
    			append_dev(details, summary);
    			append_dev(summary, t7);
    			append_dev(summary, i);
    			append_dev(details, t9);
    			append_dev(details, table);
    			append_dev(table, style);
    			append_dev(table, t11);
    			append_dev(table, tr);
    			append_dev(tr, td);
    			append_dev(td, input);
    			set_input_value(input, /*filter*/ ctx[0]);
    			append_dev(table, t12);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(table, null);
    			}

    			append_dev(celestia_page, t13);
    			mount_component(bh, celestia_page, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[1]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 0) {
    				each_value_1 = data$1.going;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(section0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*filter*/ 1 && input.value !== /*filter*/ ctx[0]) {
    				set_input_value(input, /*filter*/ ctx[0]);
    			}

    			if (dirty & /*data, filter*/ 1) {
    				each_value = data$1.past.filter(/*func*/ ctx[2]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(table, null);
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
    			if (detaching) detach_dev(celestia_page);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			destroy_component(bh);
    			mounted = false;
    			dispose();
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

    function instance$8($$self, $$props, $$invalidate) {
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
    	$$self.$capture_state = () => ({ BH: Bh, data: data$1, filter });

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
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Proj",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/micro/mars.svelte generated by Svelte v3.30.0 */

    const file$9 = "src/micro/mars.svelte";

    function create_fragment$9(ctx) {
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
    			add_location(div0, file$9, 105, 12, 2061);
    			attr_dev(div1, "class", "earth__shadow-container svelte-ba5v6m");
    			add_location(div1, file$9, 104, 8, 2011);
    			attr_dev(div2, "class", "clouds__group-1 svelte-ba5v6m");
    			add_location(div2, file$9, 108, 12, 2147);
    			attr_dev(div3, "class", "clouds svelte-ba5v6m");
    			add_location(div3, file$9, 107, 8, 2114);
    			attr_dev(div4, "class", "earth svelte-ba5v6m");
    			add_location(div4, file$9, 103, 4, 1983);
    			attr_dev(div5, "class", "earth-aura svelte-ba5v6m");
    			add_location(div5, file$9, 111, 4, 2209);
    			attr_dev(div6, "class", "wrapper svelte-ba5v6m");
    			add_location(div6, file$9, 102, 0, 1957);
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
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
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
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mars",
    			options,
    			id: create_fragment$9.name
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
    var data$2 = {
    	opensource: opensource,
    	podcast: podcast
    };

    /* src/components/facc.svelte generated by Svelte v3.30.0 */
    const file$a = "src/components/facc.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (45:20) {#if !(osc.show === -1)}
    function create_if_block(ctx) {
    	let a;
    	let img;
    	let img_src_value;
    	let t0;
    	let div;
    	let t1_value = /*osc*/ ctx[3].title + "";
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
    			if (img.src !== (img_src_value = /*osc*/ ctx[3].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1ubge3v");
    			add_location(img, file$a, 46, 28, 2808);
    			attr_dev(div, "class", "w-100 tx-c");
    			add_location(div, file$a, 47, 28, 2865);
    			attr_dev(a, "class", "pj m-5px svelte-1ubge3v");
    			attr_dev(a, "href", a_href_value = /*osc*/ ctx[3].repo);
    			add_location(a, file$a, 45, 24, 2743);
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
    		id: create_if_block.name,
    		type: "if",
    		source: "(45:20) {#if !(osc.show === -1)}",
    		ctx
    	});

    	return block;
    }

    // (44:16) {#each data.opensource as osc}
    function create_each_block_1$2(ctx) {
    	let if_block_anchor;
    	let if_block = !(/*osc*/ ctx[3].show === -1) && create_if_block(ctx);

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
    			if (!(/*osc*/ ctx[3].show === -1)) if_block.p(ctx, dirty);
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
    		source: "(44:16) {#each data.opensource as osc}",
    		ctx
    	});

    	return block;
    }

    // (69:16) {#each data.podcast as lnk}
    function create_each_block$3(ctx) {
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
    			if (img.src !== (img_src_value = /*lnk*/ ctx[0].icon)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			set_style(img, "width", "40px");
    			add_location(img, file$a, 70, 24, 5039);
    			attr_dev(a, "href", a_href_value = "https://" + /*lnk*/ ctx[0].link);
    			attr_dev(a, "class", "pcd svelte-1ubge3v");
    			add_location(a, file$a, 69, 20, 4973);
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
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(69:16) {#each data.podcast as lnk}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let celestia_page;
    	let section;
    	let article0;
    	let div0;
    	let span0;
    	let t1;
    	let svg0;
    	let path0;
    	let t2;
    	let div1;
    	let a;
    	let t4;
    	let img0;
    	let img0_src_value;
    	let t5;
    	let p;
    	let t7;
    	let article1;
    	let div2;
    	let span1;
    	let t9;
    	let svg1;
    	let path1;
    	let t10;
    	let div3;
    	let t11;
    	let article2;
    	let div4;
    	let span2;
    	let t13;
    	let svg2;
    	let path2;
    	let t14;
    	let div5;
    	let img1;
    	let img1_src_value;
    	let t15;
    	let div6;
    	let t16;
    	let div7;
    	let t18;
    	let mars;
    	let current;
    	let each_value_1 = data$2.opensource;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	let each_value = data$2.podcast;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	mars = new Mars({ $$inline: true });

    	const block = {
    		c: function create() {
    			celestia_page = element("celestia-page");
    			section = element("section");
    			article0 = element("article");
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "Open Lectures";
    			t1 = space();
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t2 = space();
    			div1 = element("div");
    			a = element("a");
    			a.textContent = "Watch Here";
    			t4 = space();
    			img0 = element("img");
    			t5 = space();
    			p = element("p");
    			p.textContent = "Various people including professors from reputable\n                    universities and even our own club members give lectures.\n                    Paper presentation is a new venture we have undertaken.\n                    People select a paper and present it to the club members,\n                    and a discussion on the paper is followed.";
    			t7 = space();
    			article1 = element("article");
    			div2 = element("div");
    			span1 = element("span");
    			span1.textContent = "Open Source";
    			t9 = space();
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t10 = space();
    			div3 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t11 = space();
    			article2 = element("article");
    			div4 = element("div");
    			span2 = element("span");
    			span2.textContent = "Podcast";
    			t13 = space();
    			svg2 = svg_element("svg");
    			path2 = svg_element("path");
    			t14 = space();
    			div5 = element("div");
    			img1 = element("img");
    			t15 = space();
    			div6 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t16 = space();
    			div7 = element("div");
    			div7.textContent = " ";
    			t18 = space();
    			create_component(mars.$$.fragment);
    			add_location(span0, file$a, 9, 16, 259);
    			attr_dev(path0, "d", "M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z");
    			add_location(path0, file$a, 11, 21, 352);
    			attr_dev(svg0, "viewBox", "0 0 640 512");
    			add_location(svg0, file$a, 10, 16, 304);
    			attr_dev(div0, "class", "l1 flex f-wt5");
    			add_location(div0, file$a, 8, 12, 215);
    			attr_dev(a, "class", "watch svelte-1ubge3v");
    			attr_dev(a, "href", "https://youtube.com/channel/UCuZ1RL7Qv5tKaQeWy28qhUw");
    			add_location(a, file$a, 17, 16, 1027);
    			attr_dev(img0, "class", "w-100 svelte-1ubge3v");
    			if (img0.src !== (img0_src_value = "./assets/images/lectures.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			add_location(img0, file$a, 23, 16, 1230);
    			attr_dev(p, "class", "p-10px svelte-1ubge3v");
    			add_location(p, file$a, 24, 16, 1310);
    			attr_dev(div1, "class", "lecture w-100 svelte-1ubge3v");
    			add_location(div1, file$a, 16, 12, 983);
    			attr_dev(article0, "class", "m-h-auto p-10px bg-e66-c26");
    			add_location(article0, file$a, 7, 8, 158);
    			add_location(span1, file$a, 35, 16, 1863);
    			attr_dev(path1, "d", "M384 144c0-44-36-80-80-80s-80 36-80 80c0 36 24 67 58 77-1 16-4 29-11 37-15 19-49 22-85 26-28 3-57 5-81 17v-144c33-10 56-40 56-76 0-44-36-80-80-80S0 36 0 80c0 36 24 66 56 76v199C24 366 0 396 0 432c0 44 36 80 80 80s80-36 80-80c0-34-21-63-51-75 3-5 8-10 15-13 16-8 40-10 66-13 42-4 90-8 118-43 14-17 21-40 22-68 32-11 54-41 54-76zM80 64c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16zm0 384c-9 0-16-7-16-16s7-16 16-16 16 7 16 16-7 16-16 16zm224-320c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16z");
    			add_location(path1, file$a, 37, 21, 1954);
    			attr_dev(svg1, "viewBox", "0 0 384 512");
    			add_location(svg1, file$a, 36, 16, 1906);
    			attr_dev(div2, "class", "l1 flex f-wt5");
    			add_location(div2, file$a, 34, 12, 1819);
    			attr_dev(div3, "class", "flex f-wrap");
    			set_style(div3, "justify-content", "space-evenly");
    			add_location(div3, file$a, 42, 12, 2563);
    			attr_dev(article1, "class", "m-h-auto p-10px bg-e6e-954");
    			add_location(article1, file$a, 33, 8, 1762);
    			add_location(span2, file$a, 57, 16, 3195);
    			attr_dev(path2, "d", "M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z");
    			add_location(path2, file$a, 59, 20, 3282);
    			attr_dev(svg2, "viewBox", "0 0 448 512");
    			add_location(svg2, file$a, 58, 16, 3234);
    			attr_dev(div4, "class", "l1 flex f-wt5");
    			add_location(div4, file$a, 56, 12, 3151);
    			attr_dev(img1, "class", "w-100 svelte-1ubge3v");
    			if (img1.src !== (img1_src_value = "./assets/images/podcast.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			add_location(img1, file$a, 65, 16, 4751);
    			attr_dev(div5, "class", "lecture w-100 svelte-1ubge3v");
    			add_location(div5, file$a, 64, 12, 4707);
    			attr_dev(div6, "class", "flex p-20px");
    			set_style(div6, "justify-content", "space-evenly");
    			add_location(div6, file$a, 67, 12, 4845);
    			attr_dev(article2, "class", "m-h-auto p-10px bg-b5e-83c");
    			add_location(article2, file$a, 55, 8, 3094);
    			set_style(div7, "height", "5em");
    			add_location(div7, file$a, 80, 8, 5332);
    			attr_dev(section, "class", "part svelte-1ubge3v");
    			add_location(section, file$a, 6, 4, 127);
    			add_location(celestia_page, file$a, 5, 0, 107);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_page, anchor);
    			append_dev(celestia_page, section);
    			append_dev(section, article0);
    			append_dev(article0, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t1);
    			append_dev(div0, svg0);
    			append_dev(svg0, path0);
    			append_dev(article0, t2);
    			append_dev(article0, div1);
    			append_dev(div1, a);
    			append_dev(div1, t4);
    			append_dev(div1, img0);
    			append_dev(div1, t5);
    			append_dev(div1, p);
    			append_dev(section, t7);
    			append_dev(section, article1);
    			append_dev(article1, div2);
    			append_dev(div2, span1);
    			append_dev(div2, t9);
    			append_dev(div2, svg1);
    			append_dev(svg1, path1);
    			append_dev(article1, t10);
    			append_dev(article1, div3);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div3, null);
    			}

    			append_dev(section, t11);
    			append_dev(section, article2);
    			append_dev(article2, div4);
    			append_dev(div4, span2);
    			append_dev(div4, t13);
    			append_dev(div4, svg2);
    			append_dev(svg2, path2);
    			append_dev(article2, t14);
    			append_dev(article2, div5);
    			append_dev(div5, img1);
    			append_dev(article2, t15);
    			append_dev(article2, div6);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div6, null);
    			}

    			append_dev(section, t16);
    			append_dev(section, div7);
    			append_dev(section, t18);
    			mount_component(mars, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 0) {
    				each_value_1 = data$2.opensource;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div3, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*data*/ 0) {
    				each_value = data$2.podcast;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div6, null);
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
    			transition_in(mars.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mars.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(celestia_page);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			destroy_component(mars);
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
    	validate_slots("Facc", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Facc> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Mars, data: data$2 });
    	return [];
    }

    class Facc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Facc",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    var Events = [
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
    		title: "Celestron Powerseeker 127EQ",
    		img: "./assets/images/celestron.jpg",
    		star: "f/7.87",
    		range: "18x - 300x"
    	},
    	{
    		title: "Sky-Watcher Dobsonian 8\" Traditional",
    		img: "./assets/images/dobbynew.jpeg",
    		star: "f/5.9",
    		range: "1x - 409x"
    	},
    	{
    		title: "Sky-Watcher Dobsonian 6\" Traditional",
    		img: "./assets/images/dobbyold.jpeg",
    		star: "f/7.8",
    		range: "1x - 306x"
    	}
    ];
    var data$3 = {
    	telescopes: telescopes
    };

    /* src/components/obs.svelte generated by Svelte v3.30.0 */
    const file$b = "src/components/obs.svelte";

    function get_each_context$4(ctx, list, i) {
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

    // (26:12) {#each data.telescopes as tsc}
    function create_each_block_1$3(ctx) {
    	let div2;
    	let div0;
    	let t0_value = /*tsc*/ ctx[5].star + "";
    	let t0;
    	let t1;
    	let t2_value = /*tsc*/ ctx[5].range + "";
    	let t2;
    	let t3;
    	let t4;
    	let div1;
    	let t5_value = /*tsc*/ ctx[5].title + "";
    	let t5;
    	let t6;
    	let img;
    	let img_src_value;
    	let t7;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = text(" (");
    			t2 = text(t2_value);
    			t3 = text(")");
    			t4 = space();
    			div1 = element("div");
    			t5 = text(t5_value);
    			t6 = space();
    			img = element("img");
    			t7 = space();
    			attr_dev(div0, "class", "telescD p-5px blur svelte-31i8u3");
    			add_location(div0, file$b, 27, 20, 1778);
    			attr_dev(div1, "class", "telesc p-5px blur svelte-31i8u3");
    			add_location(div1, file$b, 30, 20, 1907);
    			attr_dev(img, "class", "w-100 svelte-31i8u3");
    			if (img.src !== (img_src_value = /*tsc*/ ctx[5].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$b, 31, 20, 1976);
    			attr_dev(div2, "class", "lecture w-100 svelte-31i8u3");
    			add_location(div2, file$b, 26, 16, 1730);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, t3);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			append_dev(div1, t5);
    			append_dev(div2, t6);
    			append_dev(div2, img);
    			append_dev(div2, t7);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$3.name,
    		type: "each",
    		source: "(26:12) {#each data.telescopes as tsc}",
    		ctx
    	});

    	return block;
    }

    // (46:16) {#if i < 2}
    function create_if_block$1(ctx) {
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
    			add_location(strong, file$b, 48, 28, 3489);
    			set_style(i, "color", "#eeec");
    			add_location(i, file$b, 54, 28, 3777);
    			set_style(span, "font-size", "1.2em");
    			add_location(span, file$b, 47, 24, 3429);
    			add_location(br, file$b, 57, 41, 3919);
    			add_location(p, file$b, 56, 24, 3874);
    			add_location(div, file$b, 46, 20, 3399);
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
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(46:16) {#if i < 2}",
    		ctx
    	});

    	return block;
    }

    // (45:12) {#each Events.filter((e) => new Date(e.date) - new Date() > 0) as event, i}
    function create_each_block$4(ctx) {
    	let if_block_anchor;
    	let if_block = /*i*/ ctx[4] < 2 && create_if_block$1(ctx);

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
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(45:12) {#each Events.filter((e) => new Date(e.date) - new Date() > 0) as event, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let celestia_page;
    	let section;
    	let h1;
    	let t1;
    	let hr;
    	let t2;
    	let div0;
    	let t4;
    	let article0;
    	let div1;
    	let span0;
    	let t6;
    	let svg0;
    	let path0;
    	let t7;
    	let t8;
    	let article1;
    	let div2;
    	let span1;
    	let t10;
    	let svg1;
    	let path1;
    	let t11;
    	let t12;
    	let article2;
    	let div4;
    	let div3;
    	let t14;
    	let p;
    	let each_value_1 = data$3.telescopes;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
    	}

    	let each_value = Events.filter(/*func*/ ctx[1]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			celestia_page = element("celestia-page");
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "Observations";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			div0 = element("div");
    			div0.textContent = " ";
    			t4 = space();
    			article0 = element("article");
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "Telescopes";
    			t6 = space();
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t7 = space();

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t8 = space();
    			article1 = element("article");
    			div2 = element("div");
    			span1 = element("span");
    			span1.textContent = "Upcoming in Space";
    			t10 = space();
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t11 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t12 = space();
    			article2 = element("article");
    			div4 = element("div");
    			div3 = element("div");
    			div3.textContent = "Looking Up, All Night";
    			t14 = space();
    			p = element("p");
    			p.textContent = "Every Year we organise an all night observation session for\n                    our members. Lovingly called as \"star party\". We gather\n                    around the bonfire with maggi and telescopes to observe\n                    night sky in all its glory";
    			attr_dev(h1, "class", "w-100 tx-c");
    			add_location(h1, file$b, 13, 8, 276);
    			add_location(hr, file$b, 14, 8, 325);
    			set_style(div0, "height", "400px");
    			add_location(div0, file$b, 15, 8, 340);
    			add_location(span0, file$b, 18, 16, 496);
    			attr_dev(path0, "d", "M502.60969,310.04206l-96.70393,96.71625a31.88151,31.88151,0,0,1-45.00765,0L280.572,326.34115l-9.89231,9.90759a190.56343,190.56343,0,0,1-5.40716,168.52287c-4.50077,8.50115-16.39342,9.59505-23.20707,2.79725L134.54715,400.05428l-17.7999,17.79929c.70324,2.60972,1.60965,5.00067,1.60965,7.79793a32.00544,32.00544,0,1,1-32.00544-32.00434c2.79735,0,5.18838.90637,7.7982,1.60959l17.7999-17.79929L4.43129,269.94287c-6.798-6.81342-5.70409-18.6119,2.79735-23.20627a190.58161,190.58161,0,0,1,168.52864-5.407l9.79854-9.79821-80.31053-80.41716a32.002,32.002,0,0,1,0-45.09987L201.96474,9.29814A31.62639,31.62639,0,0,1,224.46868,0a31.99951,31.99951,0,0,1,22.59759,9.29814l80.32615,80.30777,47.805-47.89713a33.6075,33.6075,0,0,1,47.50808,0l47.50807,47.50645a33.63308,33.63308,0,0,1,0,47.50644l-47.805,47.89713L502.71908,265.036A31.78938,31.78938,0,0,1,502.60969,310.04206ZM219.56159,197.433l73.82505-73.82252-68.918-68.9-73.80942,73.80689Zm237.74352,90.106-68.90233-68.9156-73.825,73.82252,68.918,68.9Z");
    			add_location(path0, file$b, 20, 21, 586);
    			attr_dev(svg0, "viewBox", "0 0 512 512");
    			add_location(svg0, file$b, 19, 16, 538);
    			attr_dev(div1, "class", "l1 p-10px flex f-wt5");
    			add_location(div1, file$b, 17, 12, 445);
    			attr_dev(article0, "class", "p-10px m-h-auto bg-66e-37f");
    			add_location(article0, file$b, 16, 8, 388);
    			add_location(span1, file$b, 37, 16, 2197);
    			attr_dev(path1, "d", "M511.328,20.8027c-11.60759,38.70264-34.30724,111.70173-61.30311,187.70077,6.99893,2.09372,13.4042,4,18.60653,5.59368a16.06158,16.06158,0,0,1,9.49854,22.906c-22.106,42.29635-82.69047,152.795-142.47819,214.40356-.99984,1.09373-1.99969,2.5-2.99954,3.49995A194.83046,194.83046,0,1,1,57.085,179.41009c.99985-1,2.40588-2,3.49947-3,61.59994-59.90549,171.97367-120.40473,214.37343-142.4982a16.058,16.058,0,0,1,22.90274,9.49988c1.59351,5.09368,3.49947,11.5936,5.5929,18.59351C379.34818,35.00565,452.43074,12.30281,491.12794.70921A16.18325,16.18325,0,0,1,511.328,20.8027ZM319.951,320.00207A127.98041,127.98041,0,1,0,191.97061,448.00046,127.97573,127.97573,0,0,0,319.951,320.00207Zm-127.98041-31.9996a31.9951,31.9951,0,1,1-31.9951-31.9996A31.959,31.959,0,0,1,191.97061,288.00247Zm31.9951,79.999a15.99755,15.99755,0,1,1-15.99755-15.9998A16.04975,16.04975,0,0,1,223.96571,368.00147Z");
    			add_location(path1, file$b, 39, 21, 2294);
    			attr_dev(svg1, "viewBox", "0 0 512 512");
    			add_location(svg1, file$b, 38, 16, 2246);
    			attr_dev(div2, "class", "l1 p-10px flex f-wt5");
    			add_location(div2, file$b, 36, 12, 2146);
    			attr_dev(article1, "class", "p-10px m-h-auto bg-e6e-954");
    			add_location(article1, file$b, 35, 8, 2089);
    			set_style(div3, "font-size", "3em");
    			add_location(div3, file$b, 69, 16, 4326);
    			attr_dev(p, "class", "f-wt3");
    			add_location(p, file$b, 70, 16, 4397);
    			attr_dev(div4, "class", "w-100 p-20px m-0 flex-col f-wt1 stpty svelte-31i8u3");
    			add_location(div4, file$b, 68, 12, 4258);
    			attr_dev(article2, "class", "p-0 m-h-auto bg-cov tx-c");
    			set_style(article2, "background", "url(./assets/images/stpty.jpg) center center");
    			set_style(article2, "height", "300px");
    			add_location(article2, file$b, 64, 8, 4092);
    			attr_dev(section, "class", "svelte-31i8u3");
    			add_location(section, file$b, 12, 4, 258);
    			add_location(celestia_page, file$b, 11, 0, 238);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, celestia_page, anchor);
    			append_dev(celestia_page, section);
    			append_dev(section, h1);
    			append_dev(section, t1);
    			append_dev(section, hr);
    			append_dev(section, t2);
    			append_dev(section, div0);
    			append_dev(section, t4);
    			append_dev(section, article0);
    			append_dev(article0, div1);
    			append_dev(div1, span0);
    			append_dev(div1, t6);
    			append_dev(div1, svg0);
    			append_dev(svg0, path0);
    			append_dev(article0, t7);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(article0, null);
    			}

    			append_dev(section, t8);
    			append_dev(section, article1);
    			append_dev(article1, div2);
    			append_dev(div2, span1);
    			append_dev(div2, t10);
    			append_dev(div2, svg1);
    			append_dev(svg1, path1);
    			append_dev(article1, t11);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(article1, null);
    			}

    			append_dev(section, t12);
    			append_dev(section, article2);
    			append_dev(article2, div4);
    			append_dev(div4, div3);
    			append_dev(div4, t14);
    			append_dev(div4, p);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 0) {
    				each_value_1 = data$3.telescopes;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$3(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(article0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*Events, Date, options*/ 1) {
    				each_value = Events.filter(/*func*/ ctx[1]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(article1, null);
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
    			if (detaching) detach_dev(celestia_page);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
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

    	const func = e => new Date(e.date) - new Date() > 0;
    	$$self.$capture_state = () => ({ options, Events, data: data$3 });
    	return [options, func];
    }

    class Obs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Obs",
    			options,
    			id: create_fragment$b.name
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
    function create_if_block_3(ctx) {
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
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(44:36) ",
    		ctx
    	});

    	return block;
    }

    // (42:40) 
    function create_if_block_2(ctx) {
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
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(42:40) ",
    		ctx
    	});

    	return block;
    }

    // (40:34) 
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = Facc;

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
    			if (switch_value !== (switch_value = Facc)) {
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
    		source: "(40:34) ",
    		ctx
    	});

    	return block;
    }

    // (38:0) {#if currentPage == "Team"}
    function create_if_block$2(ctx) {
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
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(38:0) {#if currentPage == \\\"Team\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
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
    		create_if_block$2,
    		create_if_block_1,
    		create_if_block_2,
    		create_if_block_3,
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
    			props: { changePage: /*changePage*/ ctx[1] },
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
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);

    	const changePage = page => {
    		if (typeof page === "string") $$invalidate(0, currentPage = page); else {
    			console.log(document.querySelector("input[name=navigator]:checked").value);
    			$$invalidate(0, currentPage = document.querySelector("input[name=navigator]:checked").value);
    			document.querySelector("#nav").removeAttribute("open");
    		}
    	};

    	const pages = [
    		{ page: "Home", component: Home },
    		{ page: "Team", component: Team },
    		{ page: "Observations", component: Obs },
    		{ page: "Events", component: Facc },
    		{ page: "Projects", component: Proj }
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Nav,
    		Home,
    		Footer,
    		Team,
    		Proj,
    		Facc,
    		Obs,
    		changePage,
    		pages,
    		currentPage
    	});

    	$$self.$inject_state = $$props => {
    		if ("currentPage" in $$props) $$invalidate(0, currentPage = $$props.currentPage);
    	};

    	let currentPage;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	 $$invalidate(0, currentPage = "Projectsw");
    	return [currentPage, changePage, pages];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    var main = new App( { target: document.getElementsByTagName( 'main' )[ 0 ] } );

    return main;

}());
