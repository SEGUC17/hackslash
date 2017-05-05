angular.module('pettts')
    .controller('reportCtrl', function($scope, $window, $location, reportService) {
        $scope.report = function(id) {
            $scope.reportWarning = undefined;
            $scope.reportSuccess = undefined;
            if ($scope.reportMessage) {
                if ($scope.reportMessage.length >= 100 || $scope.reportMessage.length < 1) {
                    $scope.reportWarning = "Your report has to be between one and 100 chracters long";
                } else {
                    reportService.reportPost(id, $scope.reportMessage).then(function(response) {
                        if (response.success) {
                            $scope.reportSuccess = "Your report has been sent.";
                        } else {
                            $scope.reportWarning = response.message;
                        }
                    });
                }
            } else {
                $scope.reportWarning = "You have to write a report!";
            }
        };
    })