'use strict';

angular.module('ppo')

.directive('deck', function() {
    return {
        restrict: 'E',
        scope: {
            selected: '=',
            cards: '=',
            closeable: '=',
            start: '=',
            selection: '&'
        },
        template: ['<div class="pokerCard" ',
            'ng-class="{selected:(selected && closeable) ',
            '|| start || selected==card, front:selected==card}"',
            'ng-repeat="card in cards track by $index" ',
            'ng-style="getStyle($index)" ',
            'ng-click="selectCard(card)">',
            '<div class="ribbon"></div>',
            '<div class="ribbonValue">{{card}}</div>',
            '<div class="value">{{card}}</div>',
            '</div>'
        ].join(""),
        link: function(scope, element, attrs) {
            scope.selectCard = function(value) {
                if (scope.start) {
                    scope.start = false;
                    scope.selected = '';
                } else {
                    if (scope.selected === value) {
                        scope.selected = '';
                    } else {
                        scope.selected = value;
                    }
                    if (!!attrs.selection) {
                        // var express = scope.selection();
                        // express(value);
                        scope.selection({value:value});
                    }
                }
            };
            scope.getStyle = function(count) {
                var cards = scope.cards;
                var rotfactor = 180 / (cards.length - 1);
                var rotation = rotfactor * (count) - 120;
                return {
                    'transform': 'rotate(' + rotation + 'deg)',

                }
            }
        }
    };
});