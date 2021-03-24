
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
    function null_to_empty(value) {
        return value == null ? '' : value;
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

    /* src/core/nav.svelte generated by Svelte v3.30.0 */

    const file = "src/core/nav.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (8:2) {#each pages as pj, i}
    function create_each_block(ctx) {
    	let li;
    	let t_value = /*pj*/ ctx[3].page + "";
    	let t;
    	let li_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);

    			attr_dev(li, "class", li_class_value = "" + (null_to_empty(/*state*/ ctx[2].currentPage === /*pj*/ ctx[3].page
    			? "active"
    			: "") + " svelte-1d7gpys"));

    			set_style(li, "animation-delay", /*i*/ ctx[5] / 20 + "s");
    			add_location(li, file, 8, 3, 159);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);

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
    			if (dirty & /*pages*/ 1 && t_value !== (t_value = /*pj*/ ctx[3].page + "")) set_data_dev(t, t_value);

    			if (dirty & /*state, pages*/ 5 && li_class_value !== (li_class_value = "" + (null_to_empty(/*state*/ ctx[2].currentPage === /*pj*/ ctx[3].page
    			? "active"
    			: "") + " svelte-1d7gpys"))) {
    				attr_dev(li, "class", li_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(8:2) {#each pages as pj, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let details;
    	let summary;
    	let t1;
    	let ul;
    	let t2;
    	let li0;
    	let a0;
    	let t4;
    	let li1;
    	let a1;
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
    			summary.textContent = " ";
    			t1 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Education";
    			t4 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Blog";
    			set_style(summary, "z-index", "9999");
    			attr_dev(summary, "class", "svelte-1d7gpys");
    			add_location(summary, file, 5, 1, 78);
    			attr_dev(a0, "href", "http://edu.sedscelestia.org");
    			add_location(a0, file, 17, 3, 362);
    			set_style(li0, "animation-delay", "0.2s");
    			attr_dev(li0, "class", "svelte-1d7gpys");
    			add_location(li0, file, 16, 2, 325);
    			attr_dev(a1, "href", "http://blog.sedscelestia.org");
    			add_location(a1, file, 20, 3, 462);
    			set_style(li1, "animation-delay", "0.25s");
    			attr_dev(li1, "class", "svelte-1d7gpys");
    			add_location(li1, file, 19, 2, 424);
    			attr_dev(ul, "class", "svelte-1d7gpys");
    			add_location(ul, file, 6, 1, 126);
    			attr_dev(details, "id", "nav");
    			attr_dev(details, "class", "svelte-1d7gpys");
    			add_location(details, file, 4, 0, 58);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, details, anchor);
    			append_dev(details, summary);
    			append_dev(details, t1);
    			append_dev(details, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(ul, t2);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t4);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*state, pages, changePage*/ 7) {
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
    						each_blocks[i].m(ul, t2);
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
    	let { pages } = $$props, { changePage } = $$props, { state } = $$props;
    	const writable_props = ["pages", "changePage", "state"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("pages" in $$props) $$invalidate(0, pages = $$props.pages);
    		if ("changePage" in $$props) $$invalidate(1, changePage = $$props.changePage);
    		if ("state" in $$props) $$invalidate(2, state = $$props.state);
    	};

    	$$self.$capture_state = () => ({ pages, changePage, state });

    	$$self.$inject_state = $$props => {
    		if ("pages" in $$props) $$invalidate(0, pages = $$props.pages);
    		if ("changePage" in $$props) $$invalidate(1, changePage = $$props.changePage);
    		if ("state" in $$props) $$invalidate(2, state = $$props.state);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pages, changePage, state];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { pages: 0, changePage: 1, state: 2 });

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

    /* src/micro/earth.svelte generated by Svelte v3.30.0 */

    const file$2 = "src/micro/earth.svelte";

    function create_fragment$2(ctx) {
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
    			add_location(div0, file$2, 211, 12, 4342);
    			attr_dev(div1, "class", "earth__shadow-container svelte-a558kv");
    			add_location(div1, file$2, 210, 8, 4292);
    			attr_dev(div2, "class", "clouds__group-1 svelte-a558kv");
    			add_location(div2, file$2, 214, 12, 4428);
    			attr_dev(div3, "class", "clouds__group-2 svelte-a558kv");
    			add_location(div3, file$2, 215, 12, 4472);
    			attr_dev(div4, "class", "clouds svelte-a558kv");
    			add_location(div4, file$2, 213, 8, 4395);
    			attr_dev(div5, "class", "trees__group-1 svelte-a558kv");
    			add_location(div5, file$2, 218, 12, 4559);
    			attr_dev(div6, "class", "trees__group-2 svelte-a558kv");
    			add_location(div6, file$2, 219, 12, 4602);
    			attr_dev(div7, "class", "trees svelte-a558kv");
    			add_location(div7, file$2, 217, 8, 4527);
    			attr_dev(div8, "class", "earth svelte-a558kv");
    			add_location(div8, file$2, 209, 4, 4264);
    			attr_dev(div9, "class", "earth-aura svelte-a558kv");
    			add_location(div9, file$2, 222, 4, 4663);
    			attr_dev(div10, "class", "wrapper svelte-a558kv");
    			add_location(div10, file$2, 208, 0, 4238);
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
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
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
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Earth",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/team.svelte generated by Svelte v3.30.0 */
    const file$3 = "src/components/team.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (35:12) {#each data.mgmt as p}
    function create_each_block_1(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let br0;
    	let t1;
    	let span;
    	let t2_value = /*p*/ ctx[1].name + "";
    	let t2;
    	let t3;
    	let br1;
    	let t4_value = /*p*/ ctx[1].pos + "";
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
    			if (img.src !== (img_src_value = /*p*/ ctx[1].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1cwhgvn");
    			add_location(img, file$3, 36, 20, 3957);
    			add_location(br0, file$3, 37, 20, 4004);
    			set_style(span, "font-weight", "600");
    			set_style(span, "color", "#18f");
    			add_location(span, file$3, 38, 20, 4031);
    			add_location(br1, file$3, 39, 20, 4110);
    			attr_dev(div, "class", "imgCont svelte-1cwhgvn");
    			add_location(div, file$3, 35, 16, 3915);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && img.src !== (img_src_value = /*p*/ ctx[1].img)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*data*/ 1 && t2_value !== (t2_value = /*p*/ ctx[1].name + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*data*/ 1 && t4_value !== (t4_value = /*p*/ ctx[1].pos + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(35:12) {#each data.mgmt as p}",
    		ctx
    	});

    	return block;
    }

    // (55:12) {#each data.leads as p}
    function create_each_block$2(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let br0;
    	let t1;
    	let span;
    	let t2_value = /*p*/ ctx[1].pos + "";
    	let t2;
    	let t3;
    	let br1;
    	let t4_value = /*p*/ ctx[1].name + "";
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
    			if (img.src !== (img_src_value = /*p*/ ctx[1].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1cwhgvn");
    			add_location(img, file$3, 56, 20, 4956);
    			add_location(br0, file$3, 57, 20, 5003);
    			set_style(span, "font-weight", "600");
    			set_style(span, "color", "#f66b57");
    			add_location(span, file$3, 58, 20, 5030);
    			add_location(br1, file$3, 61, 20, 5155);
    			attr_dev(div, "class", "imgCont svelte-1cwhgvn");
    			add_location(div, file$3, 55, 16, 4914);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && img.src !== (img_src_value = /*p*/ ctx[1].img)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*data*/ 1 && t2_value !== (t2_value = /*p*/ ctx[1].pos + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*data*/ 1 && t4_value !== (t4_value = /*p*/ ctx[1].name + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(55:12) {#each data.leads as p}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
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
    	let each_value_1 = /*data*/ ctx[0].mgmt;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = /*data*/ ctx[0].leads;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	earth = new Earth({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			article0 = element("article");
    			h10 = element("h1");
    			span0 = element("span");
    			span0.textContent = "SEDS Celestia";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "SEDS Celestia is a chapter that is a part of SEDS India,\n            headquartered in VIT Vellore. The international headquarters of SEDS\n            lies in MIT, Boston, USA.";
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "People think that we Celestials just observe the “stars and the\n            planets” in the night sky. That’s partially correct. We do much more\n            than star gazing. We organise lectures by various eminent\n            professors, undertake many projects, exhibitions during quark,\n            bonhomie with seniors and Starparty!";
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
    			add_location(span0, file$3, 7, 23, 135);
    			attr_dev(h10, "class", "l1 svelte-1cwhgvn");
    			add_location(h10, file$3, 7, 8, 120);
    			set_style(p0, "line-height", "1.5em");
    			set_style(p0, "font-size", "1.1em");
    			set_style(p0, "text-align", "justify");
    			add_location(p0, file$3, 8, 8, 175);
    			set_style(p1, "line-height", "1.5em");
    			set_style(p1, "font-size", "1.1em");
    			set_style(p1, "text-align", "justify");
    			add_location(p1, file$3, 13, 8, 450);
    			set_style(p2, "line-height", "1.5em");
    			set_style(p2, "font-size", "1.1em");
    			set_style(p2, "text-align", "justify");
    			add_location(p2, file$3, 20, 8, 888);
    			attr_dev(article0, "class", "svelte-1cwhgvn");
    			add_location(article0, file$3, 6, 4, 102);
    			add_location(span1, file$3, 26, 12, 1067);
    			attr_dev(path0, "d", "M249.86 33.48v26.07C236.28 80.17 226 168.14 225.39 274.9c11.74-15.62 19.13-33.33 19.13-48.24v-16.88c-.03-5.32.75-10.53 2.19-15.65.65-2.14 1.39-4.08 2.62-5.82 1.23-1.75 3.43-3.79 6.68-3.79 3.24 0 5.45 2.05 6.68 3.79 1.23 1.75 1.97 3.68 2.62 5.82 1.44 5.12 2.22 10.33 2.19 15.65v16.88c0 14.91 7.39 32.62 19.13 48.24-.63-106.76-10.91-194.73-24.49-215.35V33.48h-12.28zm-26.34 147.77c-9.52 2.15-18.7 5.19-27.46 9.08 8.9 16.12 9.76 32.64 1.71 37.29-8 4.62-21.85-4.23-31.36-19.82-11.58 8.79-21.88 19.32-30.56 31.09 14.73 9.62 22.89 22.92 18.32 30.66-4.54 7.7-20.03 7.14-35.47-.96-5.78 13.25-9.75 27.51-11.65 42.42 9.68.18 18.67 2.38 26.18 6.04 17.78-.3 32.77-1.96 40.49-4.22 5.55-26.35 23.02-48.23 46.32-59.51.73-25.55 1.88-49.67 3.48-72.07zm64.96 0c1.59 22.4 2.75 46.52 3.47 72.07 23.29 11.28 40.77 33.16 46.32 59.51 7.72 2.26 22.71 3.92 40.49 4.22 7.51-3.66 16.5-5.85 26.18-6.04-1.9-14.91-5.86-29.17-11.65-42.42-15.44 8.1-30.93 8.66-35.47.96-4.57-7.74 3.6-21.05 18.32-30.66-8.68-11.77-18.98-22.3-30.56-31.09-9.51 15.59-23.36 24.44-31.36 19.82-8.05-4.65-7.19-21.16 1.71-37.29a147.49 147.49 0 0 0-27.45-9.08zm-32.48 8.6c-3.23 0-5.86 8.81-6.09 19.93h-.05v16.88c0 41.42-49.01 95.04-93.49 95.04-52 0-122.75-1.45-156.37 29.17v2.51c9.42 17.12 20.58 33.17 33.18 47.97C45.7 380.26 84.77 360.4 141.2 360c45.68 1.02 79.03 20.33 90.76 40.87.01.01-.01.04 0 .05 7.67 2.14 15.85 3.23 24.04 3.21 8.19.02 16.37-1.07 24.04-3.21.01-.01-.01-.04 0-.05 11.74-20.54 45.08-39.85 90.76-40.87 56.43.39 95.49 20.26 108.02 41.35 12.6-14.8 23.76-30.86 33.18-47.97v-2.51c-33.61-30.62-104.37-29.17-156.37-29.17-44.48 0-93.49-53.62-93.49-95.04v-16.88h-.05c-.23-11.12-2.86-19.93-6.09-19.93zm0 96.59c22.42 0 40.6 18.18 40.6 40.6s-18.18 40.65-40.6 40.65-40.6-18.23-40.6-40.65c0-22.42 18.18-40.6 40.6-40.6zm0 7.64c-18.19 0-32.96 14.77-32.96 32.96S237.81 360 256 360s32.96-14.77 32.96-32.96-14.77-32.96-32.96-32.96zm0 6.14c14.81 0 26.82 12.01 26.82 26.82s-12.01 26.82-26.82 26.82-26.82-12.01-26.82-26.82 12.01-26.82 26.82-26.82zm-114.8 66.67c-10.19.07-21.6.36-30.5 1.66.43 4.42 1.51 18.63 7.11 29.76 9.11-2.56 18.36-3.9 27.62-3.9 41.28.94 71.48 34.35 78.26 74.47l.11 4.7c10.4 1.91 21.19 2.94 32.21 2.94 11.03 0 21.81-1.02 32.21-2.94l.11-4.7c6.78-40.12 36.98-73.53 78.26-74.47 9.26 0 18.51 1.34 27.62 3.9 5.6-11.13 6.68-25.34 7.11-29.76-8.9-1.3-20.32-1.58-30.5-1.66-18.76.42-35.19 4.17-48.61 9.67-12.54 16.03-29.16 30.03-49.58 33.07-.09.02-.17.04-.27.05-.05.01-.11.04-.16.05-5.24 1.07-10.63 1.6-16.19 1.6-5.55 0-10.95-.53-16.19-1.6-.05-.01-.11-.04-.16-.05-.1-.02-.17-.04-.27-.05-20.42-3.03-37.03-17.04-49.58-33.07-13.42-5.49-29.86-9.25-48.61-9.67z");
    			add_location(path0, file$3, 28, 17, 1147);
    			attr_dev(svg0, "viewBox", "0 0 512 512");
    			attr_dev(svg0, "class", "svelte-1cwhgvn");
    			add_location(svg0, file$3, 27, 12, 1103);
    			attr_dev(h11, "class", "l1 svelte-1cwhgvn");
    			add_location(h11, file$3, 25, 8, 1039);
    			attr_dev(div0, "class", "teamrow svelte-1cwhgvn");
    			add_location(div0, file$3, 33, 8, 3842);
    			attr_dev(article1, "class", "svelte-1cwhgvn");
    			add_location(article1, file$3, 24, 4, 1021);
    			add_location(span2, file$3, 46, 12, 4247);
    			attr_dev(path1, "d", "M399 374c96-122 17-233 17-233 45 86-41 171-41 171 105-171-60-271-60-271 97 73-10 191-10 191 86 158-69 230-69 230s0-17-2-86c4 5 35 36 35 36l-24-47 63-9-63-9 20-55-31 46c-2-88-8-305-8-307v-2 1-1 2c0 1-6 219-8 307l-31-46 20 56-63 9 63 9-24 47 35-36c-2 69-2 86-2 86s-154-72-69-230c0 0-107-118-10-191 0 0-165 100-60 272 0 0-87-85-41-170 0 0-79 111 17 233 0 0-26-16-49-78 0 0 17 183 222 186h4c205-2 222-186 222-186-24 62-50 78-50 78z");
    			add_location(path1, file$3, 48, 17, 4322);
    			attr_dev(svg1, "viewBox", "0 0 448 512");
    			attr_dev(svg1, "class", "svelte-1cwhgvn");
    			add_location(svg1, file$3, 47, 12, 4278);
    			attr_dev(h12, "class", "l1 svelte-1cwhgvn");
    			add_location(h12, file$3, 45, 8, 4219);
    			attr_dev(div1, "class", "teamrow svelte-1cwhgvn");
    			add_location(div1, file$3, 53, 8, 4840);
    			attr_dev(article2, "class", "svelte-1cwhgvn");
    			add_location(article2, file$3, 44, 4, 4201);
    			attr_dev(section, "class", "svelte-1cwhgvn");
    			add_location(section, file$3, 5, 0, 88);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
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
    			if (dirty & /*data*/ 1) {
    				each_value_1 = /*data*/ ctx[0].mgmt;
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

    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0].leads;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
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
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			destroy_component(earth);
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
    	validate_slots("Team", slots, []);
    	let { data } = $$props;
    	const writable_props = ["data"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Team> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({ Earth, data });

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data];
    }

    class Team extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Team",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[0] === undefined && !("data" in props)) {
    			console.warn("<Team> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<Team>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Team>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/micro/bh.svelte generated by Svelte v3.30.0 */

    const file$4 = "src/micro/bh.svelte";

    function create_fragment$4(ctx) {
    	let div2;
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			attr_dev(div0, "class", "earth__shadow-container svelte-90kt5a");
    			add_location(div0, file$4, 39, 8, 869);
    			attr_dev(div1, "class", "earth svelte-90kt5a");
    			add_location(div1, file$4, 38, 4, 841);
    			attr_dev(div2, "class", "wrapper svelte-90kt5a");
    			add_location(div2, file$4, 37, 0, 815);
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
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
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bh",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/proj.svelte generated by Svelte v3.30.0 */
    const file$5 = "src/components/proj.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    // (25:4) {#each data.going as pj, i}
    function create_each_block_1$1(ctx) {
    	let div5;
    	let div0;
    	let div0_style_value;
    	let t0;
    	let div1;
    	let img;
    	let img_src_value;
    	let t1;
    	let div2;
    	let t2_value = /*pj*/ ctx[2].desc + "";
    	let t2;
    	let t3;
    	let div3;
    	let t4_value = /*pj*/ ctx[2].name + "";
    	let t4;
    	let t5;
    	let div4;
    	let a;
    	let t6_value = /*pj*/ ctx[2].more + "";
    	let t6;
    	let a_href_value;
    	let t7;

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			img = element("img");
    			t1 = space();
    			div2 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div3 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			div4 = element("div");
    			a = element("a");
    			t6 = text(t6_value);
    			t7 = space();
    			attr_dev(div0, "class", "hero-description-bk svelte-1cht1mv");
    			attr_dev(div0, "style", div0_style_value = /*backgrounder*/ ctx[1](/*i*/ ctx[4]));
    			add_location(div0, file$5, 26, 12, 626);
    			if (img.src !== (img_src_value = /*pj*/ ctx[2].icon)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "icon");
    			attr_dev(img, "class", "svelte-1cht1mv");
    			add_location(img, file$5, 27, 35, 721);
    			attr_dev(div1, "class", "hero-logo svelte-1cht1mv");
    			add_location(div1, file$5, 27, 12, 698);
    			attr_dev(div2, "class", "hero-description svelte-1cht1mv");
    			add_location(div2, file$5, 28, 12, 772);
    			attr_dev(div3, "class", "hero-date svelte-1cht1mv");
    			add_location(div3, file$5, 29, 12, 830);
    			attr_dev(a, "href", a_href_value = /*pj*/ ctx[2].moreLink);
    			attr_dev(a, "class", "svelte-1cht1mv");
    			add_location(a, file$5, 30, 34, 903);
    			attr_dev(div4, "class", "hero-btn svelte-1cht1mv");
    			add_location(div4, file$5, 30, 12, 881);
    			attr_dev(div5, "class", "hero svelte-1cht1mv");
    			add_location(div5, file$5, 25, 8, 595);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div5, t0);
    			append_dev(div5, div1);
    			append_dev(div1, img);
    			append_dev(div5, t1);
    			append_dev(div5, div2);
    			append_dev(div2, t2);
    			append_dev(div5, t3);
    			append_dev(div5, div3);
    			append_dev(div3, t4);
    			append_dev(div5, t5);
    			append_dev(div5, div4);
    			append_dev(div4, a);
    			append_dev(a, t6);
    			append_dev(div5, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && img.src !== (img_src_value = /*pj*/ ctx[2].icon)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*data*/ 1 && t2_value !== (t2_value = /*pj*/ ctx[2].desc + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*data*/ 1 && t4_value !== (t4_value = /*pj*/ ctx[2].name + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*data*/ 1 && t6_value !== (t6_value = /*pj*/ ctx[2].more + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*data*/ 1 && a_href_value !== (a_href_value = /*pj*/ ctx[2].moreLink)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(25:4) {#each data.going as pj, i}",
    		ctx
    	});

    	return block;
    }

    // (40:12) {#each data.past as pj, i}
    function create_each_block$3(ctx) {
    	let div3;
    	let img;
    	let img_src_value;
    	let t0;
    	let div2;
    	let div0;
    	let t1_value = /*pj*/ ctx[2].name + "";
    	let t1;
    	let t2;
    	let t3_value = /*pj*/ ctx[2].year + "";
    	let t3;
    	let t4;
    	let t5;
    	let div1;
    	let t6_value = /*pj*/ ctx[2].desc + "";
    	let t6;
    	let t7;

    	const block = {
    		c: function create() {
    			div3 = element("div");
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
    			if (img.src !== (img_src_value = /*pj*/ ctx[2].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1cht1mv");
    			add_location(img, file$5, 41, 20, 1227);
    			add_location(div0, file$5, 43, 24, 1318);
    			add_location(div1, file$5, 44, 24, 1375);
    			attr_dev(div2, "class", "name svelte-1cht1mv");
    			add_location(div2, file$5, 42, 20, 1275);
    			attr_dev(div3, "class", "comet svelte-1cht1mv");
    			add_location(div3, file$5, 40, 16, 1187);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, img);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, t3);
    			append_dev(div0, t4);
    			append_dev(div2, t5);
    			append_dev(div2, div1);
    			append_dev(div1, t6);
    			append_dev(div3, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && img.src !== (img_src_value = /*pj*/ ctx[2].img)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*data*/ 1 && t1_value !== (t1_value = /*pj*/ ctx[2].name + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*data*/ 1 && t3_value !== (t3_value = /*pj*/ ctx[2].year + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*data*/ 1 && t6_value !== (t6_value = /*pj*/ ctx[2].desc + "")) set_data_dev(t6, t6_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(40:12) {#each data.past as pj, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let section0;
    	let t1;
    	let section1;
    	let details;
    	let summary;
    	let t3;
    	let p;
    	let t4;
    	let bh;
    	let current;
    	let each_value_1 = /*data*/ ctx[0].going;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	let each_value = /*data*/ ctx[0].past;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	bh = new Bh({ $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			section0 = element("section");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t1 = space();
    			section1 = element("section");
    			details = element("details");
    			summary = element("summary");
    			summary.textContent = "Past Projects";
    			t3 = space();
    			p = element("p");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			create_component(bh.$$.fragment);
    			attr_dev(div0, "class", "space__comet svelte-1cht1mv");
    			add_location(div0, file$5, 21, 4, 509);
    			attr_dev(div1, "class", "space__comet-container");
    			set_style(div1, "position", "fixed");
    			add_location(div1, file$5, 20, 0, 444);
    			attr_dev(section0, "class", "svelte-1cht1mv");
    			add_location(section0, file$5, 23, 0, 545);
    			set_style(summary, "font-size", "20px");
    			add_location(summary, file$5, 37, 8, 1064);
    			add_location(p, file$5, 38, 8, 1128);
    			details.open = true;
    			add_location(details, file$5, 36, 4, 1041);
    			set_style(section1, "overflow-x", "scroll");
    			set_style(section1, "text-align", "left");
    			attr_dev(section1, "class", "svelte-1cht1mv");
    			add_location(section1, file$5, 35, 0, 984);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section0, anchor);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(section0, null);
    			}

    			insert_dev(target, t1, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, details);
    			append_dev(details, summary);
    			append_dev(details, t3);
    			append_dev(details, p);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(p, null);
    			}

    			insert_dev(target, t4, anchor);
    			mount_component(bh, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data, backgrounder*/ 3) {
    				each_value_1 = /*data*/ ctx[0].going;
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

    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0].past;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(p, null);
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
    			if (detaching) detach_dev(section0);
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section1);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(bh, detaching);
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
    	validate_slots("Proj", slots, []);
    	let { data } = $$props;

    	const backgrounder = i => {
    		const opts = ["#b71,#fd6", "#1a9,#4f8", "#028,#07e", "#444,#000", "#46f,#f47"];
    		return "background:linear-gradient(-20deg," + opts[Math.round(Math.random() * (opts.length - 1))] + ")";
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

    	return [data, backgrounder];
    }

    class Proj extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Proj",
    			options,
    			id: create_fragment$5.name
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

    /* src/micro/mars.svelte generated by Svelte v3.30.0 */

    const file$6 = "src/micro/mars.svelte";

    function create_fragment$6(ctx) {
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
    			add_location(div0, file$6, 105, 12, 2061);
    			attr_dev(div1, "class", "earth__shadow-container svelte-ba5v6m");
    			add_location(div1, file$6, 104, 8, 2011);
    			attr_dev(div2, "class", "clouds__group-1 svelte-ba5v6m");
    			add_location(div2, file$6, 108, 12, 2147);
    			attr_dev(div3, "class", "clouds svelte-ba5v6m");
    			add_location(div3, file$6, 107, 8, 2114);
    			attr_dev(div4, "class", "earth svelte-ba5v6m");
    			add_location(div4, file$6, 103, 4, 1983);
    			attr_dev(div5, "class", "earth-aura svelte-ba5v6m");
    			add_location(div5, file$6, 111, 4, 2209);
    			attr_dev(div6, "class", "wrapper svelte-ba5v6m");
    			add_location(div6, file$6, 102, 0, 1957);
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
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
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mars",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/facc.svelte generated by Svelte v3.30.0 */
    const file$7 = "src/components/facc.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (31:8) {#each data.telescopes as tsc}
    function create_each_block_2(ctx) {
    	let div2;
    	let div0;
    	let t0_value = /*tsc*/ ctx[7].star + "";
    	let t0;
    	let t1;
    	let t2_value = /*tsc*/ ctx[7].range + "";
    	let t2;
    	let t3;
    	let t4;
    	let div1;
    	let t5_value = /*tsc*/ ctx[7].title + "";
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
    			attr_dev(div0, "class", "telescD blur svelte-1i3psgw");
    			add_location(div0, file$7, 32, 16, 2501);
    			attr_dev(div1, "class", "telesc blur svelte-1i3psgw");
    			add_location(div1, file$7, 33, 16, 2574);
    			if (img.src !== (img_src_value = /*tsc*/ ctx[7].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1i3psgw");
    			add_location(img, file$7, 34, 16, 2633);
    			attr_dev(div2, "class", "lecture svelte-1i3psgw");
    			add_location(div2, file$7, 31, 12, 2463);
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
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && t0_value !== (t0_value = /*tsc*/ ctx[7].star + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*data*/ 1 && t2_value !== (t2_value = /*tsc*/ ctx[7].range + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*data*/ 1 && t5_value !== (t5_value = /*tsc*/ ctx[7].title + "")) set_data_dev(t5, t5_value);

    			if (dirty & /*data*/ 1 && img.src !== (img_src_value = /*tsc*/ ctx[7].img)) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(31:8) {#each data.telescopes as tsc}",
    		ctx
    	});

    	return block;
    }

    // (50:16) {#if !(osc.show == -1)}
    function create_if_block(ctx) {
    	let a;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let t1_value = /*osc*/ ctx[4].title + "";
    	let t1;
    	let t2;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			if (img.src !== (img_src_value = /*osc*/ ctx[4].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1i3psgw");
    			add_location(img, file$7, 52, 28, 3740);
    			set_style(div0, "flex", "1");
    			add_location(div0, file$7, 51, 24, 3691);
    			set_style(div1, "flex", "3");
    			set_style(div1, "padding", "10px");
    			add_location(div1, file$7, 54, 24, 3824);
    			attr_dev(a, "class", "pj svelte-1i3psgw");
    			attr_dev(a, "href", a_href_value = /*osc*/ ctx[4].repo);
    			add_location(a, file$7, 50, 20, 3636);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, div0);
    			append_dev(div0, img);
    			append_dev(a, t0);
    			append_dev(a, div1);
    			append_dev(div1, t1);
    			append_dev(a, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && img.src !== (img_src_value = /*osc*/ ctx[4].img)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*data*/ 1 && t1_value !== (t1_value = /*osc*/ ctx[4].title + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*data*/ 1 && a_href_value !== (a_href_value = /*osc*/ ctx[4].repo)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(50:16) {#if !(osc.show == -1)}",
    		ctx
    	});

    	return block;
    }

    // (49:12) {#each data.opensource as osc}
    function create_each_block_1$2(ctx) {
    	let if_block_anchor;
    	let if_block = !(/*osc*/ ctx[4].show == -1) && create_if_block(ctx);

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
    			if (!(/*osc*/ ctx[4].show == -1)) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
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
    		source: "(49:12) {#each data.opensource as osc}",
    		ctx
    	});

    	return block;
    }

    // (76:12) {#each data.podcast as lnk}
    function create_each_block$4(ctx) {
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
    			if (img.src !== (img_src_value = /*lnk*/ ctx[1].icon)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			set_style(img, "width", "40px");
    			set_style(img, "height", "auto");
    			add_location(img, file$7, 77, 20, 5871);
    			attr_dev(a, "href", a_href_value = /*lnk*/ ctx[1].link);
    			attr_dev(a, "class", "pcd svelte-1i3psgw");
    			add_location(a, file$7, 76, 16, 5819);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, img);
    			append_dev(a, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && img.src !== (img_src_value = /*lnk*/ ctx[1].icon)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*data*/ 1 && a_href_value !== (a_href_value = /*lnk*/ ctx[1].link)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(76:12) {#each data.podcast as lnk}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
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
    	let t3;
    	let a_href_value;
    	let t4;
    	let img0;
    	let img0_src_value;
    	let t5;
    	let p;
    	let t6_value = /*data*/ ctx[0].upcoming.title + "";
    	let t6;
    	let t7;
    	let br;
    	let t8;
    	let t9_value = /*data*/ ctx[0].upcoming.details + "";
    	let t9;
    	let t10;
    	let article1;
    	let div2;
    	let span1;
    	let t12;
    	let svg1;
    	let path1;
    	let t13;
    	let t14;
    	let article2;
    	let div3;
    	let span2;
    	let t16;
    	let svg2;
    	let path2;
    	let t17;
    	let div4;
    	let t18;
    	let article3;
    	let div5;
    	let span3;
    	let t20;
    	let svg3;
    	let path3;
    	let t21;
    	let div6;
    	let img1;
    	let img1_src_value;
    	let t22;
    	let div7;
    	let t23;
    	let div8;
    	let t25;
    	let mars;
    	let current;
    	let each_value_2 = /*data*/ ctx[0].telescopes;
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*data*/ ctx[0].opensource;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	let each_value = /*data*/ ctx[0].podcast;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	mars = new Mars({ $$inline: true });

    	const block = {
    		c: function create() {
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
    			t3 = text("Watch Here");
    			t4 = space();
    			img0 = element("img");
    			t5 = space();
    			p = element("p");
    			t6 = text(t6_value);
    			t7 = space();
    			br = element("br");
    			t8 = space();
    			t9 = text(t9_value);
    			t10 = space();
    			article1 = element("article");
    			div2 = element("div");
    			span1 = element("span");
    			span1.textContent = "Telescopes";
    			t12 = space();
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t13 = space();

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t14 = space();
    			article2 = element("article");
    			div3 = element("div");
    			span2 = element("span");
    			span2.textContent = "Open Source";
    			t16 = space();
    			svg2 = svg_element("svg");
    			path2 = svg_element("path");
    			t17 = space();
    			div4 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t18 = space();
    			article3 = element("article");
    			div5 = element("div");
    			span3 = element("span");
    			span3.textContent = "Podcast";
    			t20 = space();
    			svg3 = svg_element("svg");
    			path3 = svg_element("path");
    			t21 = space();
    			div6 = element("div");
    			img1 = element("img");
    			t22 = space();
    			div7 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t23 = space();
    			div8 = element("div");
    			div8.textContent = " ";
    			t25 = space();
    			create_component(mars.$$.fragment);
    			add_location(span0, file$7, 8, 12, 205);
    			attr_dev(path0, "d", "M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z");
    			add_location(path0, file$7, 10, 17, 290);
    			attr_dev(svg0, "viewBox", "0 0 640 512");
    			attr_dev(svg0, "class", "svelte-1i3psgw");
    			add_location(svg0, file$7, 9, 12, 246);
    			attr_dev(div0, "class", "l1 svelte-1i3psgw");
    			add_location(div0, file$7, 7, 8, 176);
    			attr_dev(a, "class", "watch svelte-1i3psgw");
    			attr_dev(a, "href", a_href_value = /*data*/ ctx[0].upcoming.playlist);
    			add_location(a, file$7, 16, 12, 935);
    			if (img0.src !== (img0_src_value = /*data*/ ctx[0].upcoming.img)) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			attr_dev(img0, "class", "svelte-1i3psgw");
    			add_location(img0, file$7, 17, 12, 1011);
    			add_location(br, file$7, 18, 37, 1087);
    			attr_dev(p, "class", "svelte-1i3psgw");
    			add_location(p, file$7, 18, 12, 1062);
    			attr_dev(div1, "class", "lecture svelte-1i3psgw");
    			add_location(div1, file$7, 15, 8, 901);
    			set_style(article0, "background", "linear-gradient(135deg, #e66, #ba1e68)");
    			attr_dev(article0, "class", "svelte-1i3psgw");
    			add_location(article0, file$7, 6, 4, 100);
    			add_location(span1, file$7, 23, 12, 1261);
    			attr_dev(path1, "d", "M502.60969,310.04206l-96.70393,96.71625a31.88151,31.88151,0,0,1-45.00765,0L280.572,326.34115l-9.89231,9.90759a190.56343,190.56343,0,0,1-5.40716,168.52287c-4.50077,8.50115-16.39342,9.59505-23.20707,2.79725L134.54715,400.05428l-17.7999,17.79929c.70324,2.60972,1.60965,5.00067,1.60965,7.79793a32.00544,32.00544,0,1,1-32.00544-32.00434c2.79735,0,5.18838.90637,7.7982,1.60959l17.7999-17.79929L4.43129,269.94287c-6.798-6.81342-5.70409-18.6119,2.79735-23.20627a190.58161,190.58161,0,0,1,168.52864-5.407l9.79854-9.79821-80.31053-80.41716a32.002,32.002,0,0,1,0-45.09987L201.96474,9.29814A31.62639,31.62639,0,0,1,224.46868,0a31.99951,31.99951,0,0,1,22.59759,9.29814l80.32615,80.30777,47.805-47.89713a33.6075,33.6075,0,0,1,47.50808,0l47.50807,47.50645a33.63308,33.63308,0,0,1,0,47.50644l-47.805,47.89713L502.71908,265.036A31.78938,31.78938,0,0,1,502.60969,310.04206ZM219.56159,197.433l73.82505-73.82252-68.918-68.9-73.80942,73.80689Zm237.74352,90.106-68.90233-68.9156-73.825,73.82252,68.918,68.9Z");
    			add_location(path1, file$7, 25, 17, 1343);
    			attr_dev(svg1, "viewBox", "0 0 512 512");
    			attr_dev(svg1, "class", "svelte-1i3psgw");
    			add_location(svg1, file$7, 24, 12, 1299);
    			attr_dev(div2, "class", "l1 svelte-1i3psgw");
    			add_location(div2, file$7, 22, 8, 1232);
    			set_style(article1, "background", "linear-gradient(135deg, #66e, #3469ff)");
    			attr_dev(article1, "class", "svelte-1i3psgw");
    			add_location(article1, file$7, 21, 4, 1156);
    			add_location(span2, file$7, 40, 12, 2818);
    			attr_dev(path2, "d", "M384 144c0-44-36-80-80-80s-80 36-80 80c0 36 24 67 58 77-1 16-4 29-11 37-15 19-49 22-85 26-28 3-57 5-81 17v-144c33-10 56-40 56-76 0-44-36-80-80-80S0 36 0 80c0 36 24 66 56 76v199C24 366 0 396 0 432c0 44 36 80 80 80s80-36 80-80c0-34-21-63-51-75 3-5 8-10 15-13 16-8 40-10 66-13 42-4 90-8 118-43 14-17 21-40 22-68 32-11 54-41 54-76zM80 64c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16zm0 384c-9 0-16-7-16-16s7-16 16-16 16 7 16 16-7 16-16 16zm224-320c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16z");
    			add_location(path2, file$7, 42, 17, 2901);
    			attr_dev(svg2, "viewBox", "0 0 384 512");
    			attr_dev(svg2, "class", "svelte-1i3psgw");
    			add_location(svg2, file$7, 41, 12, 2857);
    			attr_dev(div3, "class", "l1 svelte-1i3psgw");
    			add_location(div3, file$7, 39, 8, 2789);
    			set_style(div4, "display", "flex");
    			set_style(div4, "flex-wrap", "wrap");
    			add_location(div4, file$7, 47, 8, 3490);
    			set_style(article2, "background", "linear-gradient(135deg, #e6e, #945)");
    			attr_dev(article2, "class", "svelte-1i3psgw");
    			add_location(article2, file$7, 38, 4, 2716);
    			add_location(span3, file$7, 62, 12, 4079);
    			attr_dev(path3, "d", "M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z");
    			add_location(path3, file$7, 64, 16, 4158);
    			attr_dev(svg3, "viewBox", "0 0 448 512");
    			attr_dev(svg3, "class", "svelte-1i3psgw");
    			add_location(svg3, file$7, 63, 12, 4114);
    			attr_dev(div5, "class", "l1 svelte-1i3psgw");
    			add_location(div5, file$7, 61, 8, 4050);
    			if (img1.src !== (img1_src_value = "/assets/images/podcast.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			attr_dev(img1, "class", "svelte-1i3psgw");
    			add_location(img1, file$7, 70, 12, 5597);
    			attr_dev(div6, "class", "lecture svelte-1i3psgw");
    			add_location(div6, file$7, 69, 8, 5563);
    			set_style(div7, "display", "flex");
    			set_style(div7, "justify-content", "space-around");
    			set_style(div7, "padding-top", "20px");
    			add_location(div7, file$7, 72, 8, 5668);
    			set_style(article3, "background", "linear-gradient(135deg, #B5E, #83C)");
    			attr_dev(article3, "class", "svelte-1i3psgw");
    			add_location(article3, file$7, 60, 4, 3977);
    			set_style(div8, "height", "5em");
    			add_location(div8, file$7, 86, 4, 6100);
    			attr_dev(section, "class", "svelte-1i3psgw");
    			add_location(section, file$7, 5, 0, 86);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, article0);
    			append_dev(article0, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t1);
    			append_dev(div0, svg0);
    			append_dev(svg0, path0);
    			append_dev(article0, t2);
    			append_dev(article0, div1);
    			append_dev(div1, a);
    			append_dev(a, t3);
    			append_dev(div1, t4);
    			append_dev(div1, img0);
    			append_dev(div1, t5);
    			append_dev(div1, p);
    			append_dev(p, t6);
    			append_dev(p, t7);
    			append_dev(p, br);
    			append_dev(p, t8);
    			append_dev(p, t9);
    			append_dev(section, t10);
    			append_dev(section, article1);
    			append_dev(article1, div2);
    			append_dev(div2, span1);
    			append_dev(div2, t12);
    			append_dev(div2, svg1);
    			append_dev(svg1, path1);
    			append_dev(article1, t13);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(article1, null);
    			}

    			append_dev(section, t14);
    			append_dev(section, article2);
    			append_dev(article2, div3);
    			append_dev(div3, span2);
    			append_dev(div3, t16);
    			append_dev(div3, svg2);
    			append_dev(svg2, path2);
    			append_dev(article2, t17);
    			append_dev(article2, div4);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div4, null);
    			}

    			append_dev(section, t18);
    			append_dev(section, article3);
    			append_dev(article3, div5);
    			append_dev(div5, span3);
    			append_dev(div5, t20);
    			append_dev(div5, svg3);
    			append_dev(svg3, path3);
    			append_dev(article3, t21);
    			append_dev(article3, div6);
    			append_dev(div6, img1);
    			append_dev(article3, t22);
    			append_dev(article3, div7);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div7, null);
    			}

    			append_dev(section, t23);
    			append_dev(section, div8);
    			append_dev(section, t25);
    			mount_component(mars, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*data*/ 1 && a_href_value !== (a_href_value = /*data*/ ctx[0].upcoming.playlist)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (!current || dirty & /*data*/ 1 && img0.src !== (img0_src_value = /*data*/ ctx[0].upcoming.img)) {
    				attr_dev(img0, "src", img0_src_value);
    			}

    			if ((!current || dirty & /*data*/ 1) && t6_value !== (t6_value = /*data*/ ctx[0].upcoming.title + "")) set_data_dev(t6, t6_value);
    			if ((!current || dirty & /*data*/ 1) && t9_value !== (t9_value = /*data*/ ctx[0].upcoming.details + "")) set_data_dev(t9, t9_value);

    			if (dirty & /*data*/ 1) {
    				each_value_2 = /*data*/ ctx[0].telescopes;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(article1, null);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_2.length;
    			}

    			if (dirty & /*data*/ 1) {
    				each_value_1 = /*data*/ ctx[0].opensource;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div4, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0].podcast;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div7, null);
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
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks_2, detaching);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			destroy_component(mars);
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
    	validate_slots("Facc", slots, []);
    	let { data } = $$props;
    	const writable_props = ["data"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Facc> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({ data, Mars });

    	$$self.$inject_state = $$props => {
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data];
    }

    class Facc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Facc",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[0] === undefined && !("data" in props)) {
    			console.warn("<Facc> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<Facc>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Facc>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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

    // (35:0) {:else}
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
    		source: "(35:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (33:42) 
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
    		source: "(33:42) ",
    		ctx
    	});

    	return block;
    }

    // (31:44) 
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = Facc;

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
    		source: "(31:44) ",
    		ctx
    	});

    	return block;
    }

    // (29:0) {#if state.currentPage == "Team"}
    function create_if_block$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = Team;

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
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(29:0) {#if state.currentPage == \\\"Team\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let nav;
    	let t;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	nav = new Nav({
    			props: {
    				pages: /*pages*/ ctx[2],
    				state: /*state*/ ctx[0],
    				changePage: /*changePage*/ ctx[1]
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
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);

    	const changePage = e => {
    		$$invalidate(0, state.currentPage = e.target.innerText, state);
    		document.querySelector("#nav").removeAttribute("open");
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
    		Team,
    		Proj,
    		Facc,
    		prjs,
    		data,
    		changePage,
    		pages,
    		state
    	});

    	$$self.$inject_state = $$props => {
    		if ("state" in $$props) $$invalidate(0, state = $$props.state);
    	};

    	let state;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	 $$invalidate(0, state = { currentPage: "Home" });
    	return [state, changePage, pages];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    var main = new App( { target: document.getElementsByTagName( 'main' )[ 0 ] } );

    return main;

}());
