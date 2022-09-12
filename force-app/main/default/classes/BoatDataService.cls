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
    public static List<Boat__c> getBoats(String boatTypeId) {
        return [
            SELECT Name, Length__c, Price__c, Description__c
            FROM Boat__c
            WHERE BoatType__c = :boatTypeId
            ORDER BY Name
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
    public static String getBoatsByLocation(Decimal latitude, Decimal longitude, String boatTypeId) {
        
        String query = 'SELECT Name, Geolocation__Latitude__s, Geolocation__Longitude__s FROM Boat__c';
        if (String.isNotBlank(boatTypeId)) {
            query += 'WHERE BoatType__c = :boatTypeId';
        }
        query += ' WITH SECURITY_ENFORCED';
        return JSON.serialize(Database.query(query));
    }

    @AuraEnabled
    public static String updateBoatList(Object data){
        List<Boat__c> boatsForUpdate = (List<Boat__c>) JSON.deserialize(
            JSON.serialize(data),
            List<Boat__c>.class
        );
        try {
            update boatsForUpdate;
            return 'Success: Boats Updated Successfully!';
        } catch (Exception e) {
            return 'The following exception has occurred: ' + e.getMessage();
        }
    }
}