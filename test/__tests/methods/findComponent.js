import { test } from 'qunit';

const Widget = Ractive.extend({
	template: '<p>{{content}}</p>'
});

const Decoy = Ractive.extend({
	template: '<p>I am a decoy</p>'
});

const MockRactive = Ractive.extend({
	components: {
		widget: Widget,
		decoy: Decoy
	}
});

test( 'ractive.findComponent() finds the first component, of any type', function ( t ) {
	var ractive, widget;

	ractive = new MockRactive({
		el: fixture,
		template: '<widget/>'
	});

	widget = ractive.findComponent();

	t.ok( widget instanceof Widget );
});

test( 'ractive.findComponent(selector) finds the first component of type `selector`', function ( t ) {
	var ractive, widget;

	ractive = new MockRactive({
		el: fixture,
		template: '<decoy/><widget/>'
	});

	widget = ractive.findComponent( 'widget' );

	t.ok( widget instanceof Widget );
});

test( 'findComponent and findAllComponents work through {{>content}}', t => {
	const Component = Ractive.extend({});
	const Wrapper = Ractive.extend({
		template: '<p>{{>content}}</p>',
		components: { Component }
	});

	const ractive = new Ractive({
		el: fixture,
		template: '<Wrapper><Component/></Wrapper>',
		components: { Wrapper, Component }
	});

	const find = ractive.findComponent( 'Component' );
	const findAll = ractive.findAllComponents( 'Component' );

	t.ok( find, 'component not found' );
	t.equal( findAll.length, 1);
});
