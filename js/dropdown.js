document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('options');
    let isExpanded = false;

    selectElement.addEventListener('click', function() {
        if (isExpanded) {
            this.size = 1;
        } else {
            this.size = 5;
        }
        isExpanded = !isExpanded;
    });

    selectElement.addEventListener('blur', function() {
        this.size = 1;
        isExpanded = false;
    });

    selectElement.addEventListener('input', function() {
        this.size = 1;
        this.blur();
        isExpanded = false;
    });
});
