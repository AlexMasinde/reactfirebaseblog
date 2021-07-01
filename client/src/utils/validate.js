export default function validate(title, category, content) {
    const errors = {}
    if(category.trim() = '') errors.category = 'Please select a category for your article'
    if(title.trim() = '') errors.category='Please provide a title for your article'
    if(content.trim()='') errors.category='Content cannot be empty'

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    }
}