public with sharing class BoatDataService {
    
    @AuraEnabled(cacheable = true)
    public static List<BoatType__c> getBoatTypes() {
        return [
            SELECT Id, Name
            FROM BoatType__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }

    @AuraEnabled(cacheable = true)
    public static List<Boat__c> getBoats(Id selectedBoatId) {
        return [
            SELECT Name
            FROM Boat__c
            WHERE Id = :selectedBoatId
        ];
    }
    
    @AuraEnabled(cacheable = true)
    public static List<Boat__c> getSimilarBoats(Id mainBoatId, Integer mainBoatLength) {
        List<Boat__c> similarBoatsList = [
            SELECT  Id, Name, BoatType__r.Name, Length__c, Picture__c, Price__c, Year_Built__c
            FROM   Boat__c
            WHERE  Id != :mainBoatId
            AND   (Length__c >= :mainBoatLength / 1.2)
            AND   (Length__c <= :mainBoatLength * 1.2)
            ORDER BY Length__c, Price__c, Year_Built__c
        ];
        return similarBoatsList;
    }

    @AuraEnabled(cacheable = false)
    public static List<BoatReview__c> getAllReviews(Id boatId) {
        return [
            SELECT Name
            FROM BoatReview__c
            WHERE Id = :boatId
        ];
    }
    
    @AuraEnabled(cacheable = true)
    public static String getBoatsByLocation(
        Double latitude, Double longitude, Id boatTypeId
    ) {
        return null;
    }
}