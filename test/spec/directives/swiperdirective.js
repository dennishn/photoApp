'use strict';

describe('Directive: swiperDirective', function () {

  // load the directive's module
  beforeEach(module('photoAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<swiper-directive></swiper-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the swiperDirective directive');
  }));
});
