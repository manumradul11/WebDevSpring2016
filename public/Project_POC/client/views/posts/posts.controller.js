(function()
{
    angular
        .module("FeeFoodApp")
        .controller("PostController", PostController);

    function PostController($scope)
    {

        $scope.hours = numbers(12);

        function numbers(n)
        {
            var nums = [];

            for(var i=0;i <n ;i++)
            {
               nums.push(i);
            }

            return nums;

        }


    }
})();