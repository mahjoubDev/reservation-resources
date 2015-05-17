'use strict';

angular.module('jhipsterApp')
    .controller('ReservationController', function ($scope, $http, Category, Resource, Reservation, Users, Principal) {
        $scope.categories = Category.findAll();
        $scope.resources = Resource.findAll();
        $scope.resourcesByCategory = [];
        $scope.reservations = Reservation.findAll();
        $scope.showResourceRelatedToCtagory = false;
        $scope.eventsResourceRelatedToResource = false;
        $scope.toggle = '!toggle';
        $scope.events = [];
        $scope.eventSources = [];
        $scope.event = {};
        $scope.account = {};
        $scope.reservationInfo = {} ;
        Users.getCurrentUser(function (response) {
            $scope.account = response;

        });


        /**
         *
         */
        $scope.add = function (reservationInfo) {
            console.log('call method add reservation');
            console.log("reservationInfo   " + JSON.stringify(reservationInfo));

            var promise = Reservation.add({}, reservationInfo).$promise;
            promise.then(function (data) {

                    console.log('reservation has been added successfully')
                    $scope.reservations = Reservation.findAll();
                    $scope.showModalAdd = !$scope.showModalAdd;
                    $scope.reservationInfo = {};

                }, function (error) {
                    console.log("there is an error " + JSON.stringify(error));
                }
            );
        };

        /**
         *
         * @param reference
         */
        $scope.delete = function (reference) {

            console.log("call delete rservation web services");
            var promise = Reservation.delete({referenceReservation: reference}).$promise;
            promise.then(function (data) {
                console.log("the reservation has been deleted succesfully");
                $scope.reservations = Reservation.findAll();

            }, function (error) {
                console.log("there is an error " + JSON.stringify(error));chouf
            });


        };

        /**
         *
         * @param reference
         */
        $scope.update = function (reservationInfo) {

          //  console.log("call delete rservation web services" +JSON.stringify(reservationInfo));
           // var reservationInfo = {} ;
     /*       for (var i = 0; i < $scope.reservationForResource.length; i++) {
                if (event.id === $scope.reservationForResource[i].id) {
                    console.log("resource is :" + $scope.resources[i]) ;
                    reservationInfo =$scope.reservationForResource[i] ;
                    reservationInfo.dateStart = event.start_date.format("Y-m-d h:i:s") ;
                    reservationInfo.dateEnd = event.end_date.format("Y-m-d h:i:s") ;
                }
            }*/
            if(angular.isDefined(reservationInfo)) {
                var promise = Reservation.update({referenceReservation: reservationInfo.reference},reservationInfo).$promise;
                promise.then(function (data) {
                    console.log("the reservation has been updatedd succesfully");
                    $scope.reservations = Reservation.findAll();
                    $scope.reservationInfo = {} ;

                }, function (error) {
                    console.log("there is an error " + JSON.stringify(error));
                });

            }

        };




        /**
         *
         */
        $scope.toggleModalAdd = function () {
            $scope.showModalAdd = !$scope.showModalAdd;
        };
        /**
         *
         */
        $scope.toggleModalUpdate = function () {
            $scope.showModalUpdate = !$scope.showModalUpdate;
        };

        /**
         *
         */
        $scope.saveEvent = function () {

            console.log("even has been added ")
        };

        /**
         *
         * @param referenceCategory
         */
        $scope.getResourceByReferenceCategory = function (referenceCategory) {
            console.log("hello this ctagory " + referenceCategory);
            var resources = [];
            for (var i = 0; i < $scope.resources.length; i++) {
                if (referenceCategory === $scope.resources[i].referenceCategory) {
                    console.log("resource is :" + $scope.resources[i])

                    resources.push($scope.resources[i]);
                }
            }
            console.log("length is " + $scope.resourcesByCategory);
            if (resources.length !== 0) {
                $scope.resourcesByCategory = resources;
                $scope.showResourceRelatedToCtagory = true;
            }
            else {
                $scope.resourcesByCategory = [];
                $scope.showResourceRelatedToCtagory = false;
            }


        };


        /**
         *
         * @param referenceResource
         */
        $scope.getReservationsByReferenceResources = function (referenceResource) {
            console.log('call method get reservation by reference resource');
            $scope.eventsResourceRelatedToResource = false;
            //  console.log('the sue '+Principal.isInRole('users')) ;
            var promise = Reservation.findByResource({referenceResource: referenceResource}).$promise;
            promise.then(function (data) {
                    console.log('reservation getted ' +JSON.stringify(data));
                    $scope.reservationForResource = data ;
                    // this.convertReservationsToEvents(data);
                    for (var i = 0; i < $scope.reservations.length; i++) {
                        var res = $scope.reservations[i];
                        var dateStart = new Date(res.dateStart);
                        var dateEnd = new Date(res.dateEnd);
                        event = {
                            //format("Y-m-d h:i:s"),
                            id: res.id,
                            text: res.description,
                            start_date: new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), dateStart.getHours(),
                                dateStart.getMinutes(), dateStart.getSeconds()),
                            end_date: new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), dateEnd.getHours(),
                                dateEnd.getMinutes(), dateEnd.getSeconds()),
                            login: res.loginUser,
                            resource: res.referenceResource,
                            reference: res.reference

                        }
                        $scope.events.push(event);

                    }
                    console.log('events is ' + JSON.stringify($scope.events));
                    $scope.eventsResourceRelatedToResource = true;

                }, function (error) {
                    console.log("there is an error " + error);
                }
            );

        }


        //======================================================================================================
        //-----------------------------------    Calendar  ------------------------------------------------------
        //=======================================================================================================

        /*    $scope.events = [
         {
         id: 1,
         text: "Reservation sale reunion",
         start_date: new Date(2015, 4, 11, 9, 0, 0),
         end_date: new Date(2015, 4, 12, 11, 0, 0),
         login: "mahjoub",
         resource: "resource num 1",
         reference: "0000001"
         },
         {
         id: 2, text: "Reservation tablette",
         start_date: new Date(2015, 4, 22),
         end_date: new Date(2015, 4, 24),
         login: "nesrine",
         resource: "resource num 1",
         reference: "0000002"
         },

         {
         id: 3, text: "Reservation pc",
         start_date: new Date(2015, 4, 30),
         end_date: new Date(2015, 5, 4),
         login: "achref",
         resource: "resource num 1",
         reference: "0000003"
         }
         ];*/

        $scope.scheduler = {date: new Date()};


    });


angular.module('jhipsterApp').directive('dhxScheduler', function () {
    return {
        restrict: 'A',
        scope: false,
        transclude: true,
        template: '<div class="dhx_cal_navline"' +
        ' ng-transclude></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',


        link: function ($scope, $element, $attrs, $controller, Principal) {
            var isAuthenticated = Principal.isAuthenticated
            if (!$scope.scheduler)
                $scope.scheduler = {};
            $scope.scheduler.mode = $scope.scheduler.mode || "month";
            $scope.scheduler.date = $scope.scheduler.date || new Date();

            scheduler.attachEvent("onDblClick", function (id, e) {
                var ev = scheduler.getEvent(id);
                console.log('clicked here   ' + Principal.isAuthenticated);
                if (!isAuthenticated) {
                    $scope.event = ev;
                   $scope.reservationInfo.dateStart = ev.start_date.format("Y-m-d h:i:s") ;
                    $scope.reservationInfo.dateEnd = ev.end_date.format("Y-m-d h:i:s") ;
                    $scope.reservationInfo.reference = ev.reference ;
                    $scope.reservationInfo.id = ev.id ;
                    $scope.reservationInfo.referenceResource = ev.resource ;
                    $scope.reservationInfo.loginUser = ev.login ;
                    $scope.reservationInfo.description = ev.text ;
                    $scope.$apply();
                    $scope.$apply(" showModalUpdate = !showModalUpdate");
                }

                return true;
            });


            scheduler.showLightbox = function (id) {
                var ev = scheduler.getEvent(id);
                console.log("custom  form event " + ev);
            };


            //watch data collection, reload on changes
            $scope.$watch($attrs.data, function (collection) {
                scheduler.clearAll();
                scheduler.parse(collection, "json");
            }, true);

            //mode or date
            $scope.$watch(function () {
                return $scope.scheduler.mode + $scope.scheduler.date.toString();
            }, function (nv, ov) {
                var mode = scheduler.getState();
                if (nv.date != mode.date || nv.mode != mode.mode)
                    scheduler.setCurrentView($scope.scheduler.date, $scope.scheduler.mode);
            }, true);

            //size of scheduler
            $scope.$watch(function () {
                return $element[0].offsetWidth + "." + $element[0].offsetHeight;
            }, function () {
                scheduler.setCurrentView();
            });

            //styling for dhtmlx scheduler
            $element.addClass("dhx_cal_container");
            //init scheduler
            scheduler.config.dblclick_create = false;
            scheduler.config.drag_create = false;
            scheduler.config.drag_move = true;
            scheduler.config.readonly = false;
            scheduler.config.touch = true;


            //init scheduler
            scheduler.init($element[0], $scope.scheduler.mode, $scope.scheduler.date);


        }

    }
});

angular.module('jhipsterApp').directive('dhxTemplate', ['$filter', function ($filter) {
    scheduler.aFilter = $filter;

    return {
        restrict: 'AE',
        terminal: true,

        link: function ($scope, $element, $attrs, $controller) {
            $element[0].style.display = 'none';

            var template = $element[0].innerHTML;
            template = template.replace(/[\r\n]/g, "").replace(/"/g, "\\\"").replace(/\{\{event\.([^\}]+)\}\}/g, function (match, prop) {
                if (prop.indexOf("|") != -1) {
                    var parts = prop.split("|");
                    return "\"+scheduler.aFilter('" + (parts[1]).trim() + "')(event." + (parts[0]).trim() + ")+\"";
                }
                return '"+event.' + prop + '+"';
            });
            var templateFunc = Function('sd', 'ed', 'event', 'return "' + template + '"');
            scheduler.templates[$attrs.dhxTemplate] = templateFunc;
        }
    };
}]);

angular.module('jhipsterApp').directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                dateFormat: "yy-mm-dd 00:00:00",
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            element.datepicker(options);
        }
    };
});