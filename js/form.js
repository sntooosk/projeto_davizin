function toggleForm() {
    var form = document.querySelector('.form-borda');
    var isVisible = form.style.display === 'block';

    form.style.display = isVisible ? 'none' : 'block';
    document.body.style.overflowY = isVisible ? 'auto' : 'hidden';
}

