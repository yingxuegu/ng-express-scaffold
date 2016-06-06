
angular.module('vetro')
.factory('ajaxFactory', function ($http, $q, $rootScope) {
 var apiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiZXJpZS5jb3VudHkiLCJpZCI6MTYsImlhdCI6MTQ1OTYyMDY2OH0.Bu7MIIO0gfEPcpnyIK8JI4yXia9EvS39gjZgRocx1CI";
 var domain = "https://vetro.io";

 // var apiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiZXJpZS5jb3VudHkiLCJpZCI6MTYsImlhdCI6MTQ1OTYyODU3MX0.xsTvhkpIEhWqG4BC8tmPzUHtjZDbVb-uwRgLOaM6Kh4";
 // var domain = "http://localhost:8082";
 return {

   geocodeAddress : function(address, zip) {
     return $http.jsonp('https://dev.virtualearth.net/REST/v1/Locations?key=Aj854OXYEP_n8XshpNbHh4nYFAgJ5vRimKkTZ-Rli7h8s_3jc_7RpgVlDSffU2No&countryRegion=US'
     + '&postalCode=' + zip
     + '&addressLine=' + address
     + '&maxResults=20&jsonp=JSON_CALLBACK'
     );
   },
   sendForm: function (fullInfo) {
     fullInfo.contact_status = $rootScope.currentStatus;
     fullInfo.first_name = fullInfo.first;
     fullInfo.last_name = fullInfo.last;
     fullInfo.source = "demandgen";
     return $http({
       method : 'POST',
       url : domain+'/api/lead?token=' + apiToken,
       data : fullInfo,
       withCredentials: false,
       cache: false
     });
   },

   incrementSignupCount : function(id){
     return $http({
       method : 'POST',
       url : domain+'/api/uberhood/rankings/' + id + '?token=' + apiToken,
       data: {},
       withCredentials: false,
       cache: false
     });
   },

   getProgressZones : function(location){
     return $http({
       method : 'GET',
       url : domain+'/api/uberhood?token=' + apiToken,
       withCredentials: false,
       cache : false
     });
   },

   getUberhoodData : function(gid){
     return $http({
       method : 'GET',
       url : domain+'/api/uberhood/details/' + gid + "?token=" + apiToken,
       withCredentials: false,
       cache : false
     });
   },

   getUberhoodRankings : function(){
     return $http({
       method : 'GET',
       url : domain+'/api/uberhood/rankings?token=' + apiToken,
       withCredentials: false,
       cache : false
     });
   }

 };


});