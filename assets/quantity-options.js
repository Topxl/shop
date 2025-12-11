/*
* Copyright Productly
*
* This script is used to handle the quantity options
*
* @author @VietNguyenR
* @version 1.0.0
* @since 2025-05-09
*/

class QuantityOptions extends HTMLElement {
    constructor() {
        super();
        this.options = this.querySelectorAll('.quantity__option');
        
        // Find the hidden input, either within a form or anywhere in the document
        const form = this.closest('form');
        this.hiddenInput = form ? 
            form.querySelector('input[data-quantity-input]') : 
            document.querySelector('input[data-quantity-input]');
        
        if (this.options.length > 0) {
            this.options.forEach(option => {
                option.addEventListener('click', this.onOptionClick.bind(this));
            });
            
            // Initialize first option as selected if none is selected
            if (!this.querySelector('.quantity__option.selected')) {
                this.options[0].classList.add('selected');
                if (this.hiddenInput) {
                    this.hiddenInput.value = this.options[0].dataset.quantity;
                }
            }
        }
    }

    onOptionClick(event) {
        const selectedOption = event.currentTarget;
        const quantity = selectedOption.dataset.quantity;
        
        // Update hidden input value
        if (this.hiddenInput) {
            this.hiddenInput.value = quantity;
            // Trigger change event to update any dependent elements
            this.hiddenInput.dispatchEvent(new Event('change'));
        }

        // Update visual selection
        this.options.forEach(option => {
            option.classList.remove('selected');
        });
        selectedOption.classList.add('selected');
    }
}

customElements.define('quantity-options', QuantityOptions);
