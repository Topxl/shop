document.addEventListener('DOMContentLoaded', function () {
    const quantityOptions = document.querySelectorAll('.quantity__option');
    const quantityInputs = document.querySelectorAll('input[data-quantity-input]');

    function updatePrice(quantity, quantityInput) {
        const basePrice = parseFloat(quantityInput.dataset.price) / 100;
        let totalPrice = basePrice * quantity;
        let discountPercentage = 0;

        if (window.discountPercentageType && window.discountPercentageType.trim() === 'manual') {
            // Map manual discount based on selected quantity
            if (quantity === 1) discountPercentage = 0;
            else if (quantity === 2) discountPercentage = parseFloat(window.discountPercentage1) || 0;
            else if (quantity === 3) discountPercentage = parseFloat(window.discountPercentage2) || 0;

            totalPrice = totalPrice * (1 - discountPercentage / 100);
        } else {
            // Automatic discount logic
            discountPercentage = parseFloat(quantityInput.dataset.discountPercentage) || 10;

            if (quantity > 1) {
                const discountStep = quantity - 1;
                const currentDiscount = discountStep * discountPercentage;
                totalPrice = totalPrice * (1 - currentDiscount / 100);
            }
        }

        const moneyFormat = Shopify.formatMoney(totalPrice * 100, window.money_format);

        const priceElement = document.querySelector('.price--medium .price__regular .price-item--regular');
        if (priceElement) priceElement.textContent = moneyFormat;

        const subtotalElement = document.querySelector('.productView-subtotal .money-subtotal');
        if (subtotalElement) subtotalElement.textContent = moneyFormat;

        const stickyPrice = document.querySelector('[data-sticky-add-to-cart] .money-subtotal');
        if (stickyPrice) stickyPrice.textContent = moneyFormat;

        // Update hidden input value
        quantityInput.value = quantity;
    }

    // Handle quantity options (stacked style)
    quantityOptions.forEach(option => {
        option.addEventListener('click', function () {
            const quantity = parseInt(this.dataset.quantity);

            // Remove 'selected' class from all options
            document.querySelectorAll('.quantity__option[data-quantity]').forEach(opt => {
                opt.classList.toggle('selected', opt.dataset.quantity === String(quantity));
            });

            // Update all quantity inputs
            quantityInputs.forEach(input => {
                input.value = quantity;
            });

            if (quantityInputs.length > 0) {
                updatePrice(quantity, quantityInputs[0]);
                quantityInputs[0].dispatchEvent(new Event('change'));
            }
        });
    });

    // Handle quantity input changes (manual input)
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const quantity = parseInt(this.value);
            if (quantity > 0) {
                updatePrice(quantity, this);
            }
        });
    });

    // Set default selected quantity
    const defaultQuantity = 1;
    document.querySelectorAll(`.quantity__option[data-quantity="${defaultQuantity}"]`).forEach(opt => {
        opt.classList.add('selected');
    });

    if (quantityInputs.length > 0) {
        updatePrice(defaultQuantity, quantityInputs[0]);
    }
});









