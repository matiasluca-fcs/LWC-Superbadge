import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BoatSearch extends LightningElement {
    isLoading = false;
    boatiddesdecombobox;
    
    // Handles loading event
    handleLoading() { }
    
    // Handles done loading event
    handleDoneLoading() { }
    
    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event) {

        console.log('******* EVENT DETAILS THAT CAME TO boatSearch.searchBoats(event): ', event.detail.boatTypeId);

        //this.boatiddesdecombobox = event.details.boatTypeId;

         // Evento para enviar a Boat Search Results
        // const myDetails = {
        //     boatTypeId: event.detail.boatTypeId
        // };

        // const searchEvent = new CustomEvent(
        //     "boatid",
        //     {detail: myDetails}
        // );

        // this.dispatchEvent(searchEvent);
    }
    
    createNewBoat() { }
}