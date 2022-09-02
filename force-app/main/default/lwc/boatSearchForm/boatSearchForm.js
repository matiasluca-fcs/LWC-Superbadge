import { LightningElement, api, wire } from 'lwc';

// imports
// import getBoatTypes from the BoatDataService => getBoatTypes method';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
export default class BoatSearchForm extends LightningElement {
    
    @api selectedBoatTypeId = '';
    
    // Private
    _error = undefined;
    
    searchOptions;
    
    // Wire a custom Apex method
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
        if (data) {
            //this.searchOptions = data.map( function(item) {
            this.searchOptions = data.map( (item) => {
                return [
                    { label: item.fields.Name, value: item.fields.Id}
                ];
            });
            this.searchOptions.unshift({ label: 'All Types', value: '' });
        } else if (error) {
            this.searchOptions = undefined;
            this._error = error;
        }
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
        // Create the const searchEvent
        // searchEvent must be the new custom event search

        // const searchEvent = new CustomEvent('selectedBoatTypeId', {
        //     detail: event.detail
        // });

        // const searchEvent = new CustomEvent('selectedBoatTypeId', {
        //     detail: event.fields.value
        // });

        // const searchEvent = new CustomEvent('selectedBoatTypeId', {
        //     detail: event.target.value
        // });

        const myDetails = {
            boatTypeId: this.selectedBoatTypeId
        }

        const searchEvent = new CustomEvent('search', {
            detail: myDetails
        });

        // const searchEvent = new CustomEvent('selectedBoatTypeId', {
        //     detail: this.selectedBoatTypeId.fields.Id.value
        // });

        // const searchEvent = new CustomEvent('selectedboattypeid', {
        //     detail: this.selectedBoatTypeId
        // });

        this.dispatchEvent(searchEvent);
    }
}