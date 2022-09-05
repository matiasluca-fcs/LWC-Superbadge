// imports
import { LightningElement, api, wire } from 'lwc';
// import getBoatTypes from the BoatDataService => getBoatTypes method';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
export default class BoatSearchForm extends LightningElement {
    
    @api selectedBoatTypeId = '';
    
    // Private
    error = undefined;
    
    searchOptions;
    
    // Wire a custom Apex method
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
        if (data) {
            //this.searchOptions = data.map( function(item) {
            this.searchOptions = data.map( type => {
                console.log('**** BoatType record retrieved from Apex Controller:', type)
                return { label: type.Name, value: type.Id}
            });
            this.searchOptions.unshift({ label: 'All Types', value: '' }); // This method pushes a new value (in this case, an Object) into the first position in an array
        } else if (error) {
            this.searchOptions = undefined;
            this.error = error;
        }

        console.log('****Search Options after the data.map(): ', this.searchOptions);
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    // Create the const searchEvent
    // searchEvent must be the new custom event search
    
    //console.log('***Selected Boat Type from handleSearchOptionChange: ', event.detail);
    handleSearchOptionChange(event) {

        this.selectedBoatTypeId = event.detail.value;

        const myDetails = {
            boatTypeId: this.selectedBoatTypeId // Using literally this expression was crucial for the Challenge check
        };

        const searchEvent = new CustomEvent(
            "search",
            { detail: myDetails } // because of this property we access the event details using 'event.detail.boatTypeId'
        );

        this.dispatchEvent(searchEvent);
    }
}

        // const searchEvent = new CustomEvent('selectedBoatTypeId', {
        //     detail: event.detail
        // });

        // const searchEvent = new CustomEvent('selectedBoatTypeId', {
        //     detail: event.fields.value
        // });

        // const searchEvent = new CustomEvent('selectedBoatTypeId', {
        //     detail: event.target.value
        // });

        // const searchEvent = new CustomEvent('selectedBoatTypeId', {
        //     detail: this.selectedBoatTypeId.fields.Id.value
        // });

        // const searchEvent = new CustomEvent('selectedboattypeid', {
        //     detail: this.selectedBoatTypeId
        // });