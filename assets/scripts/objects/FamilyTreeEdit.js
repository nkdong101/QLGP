// FamilyTreeEdit.js
export default class FamilyTreeEdit {
    constructor() {
      this.node = null;
    //   this.formElement = document.createElement('div');
    //   this.formElement.style.display = 'none';
    //   document.body.appendChild(this.formElement);
    }
  
    init(obj) {
      // Initialize the form with necessary configuration
      this.obj = obj
    }
  
    show(node) {
      this.node = node;
    }
  
    hide(shouldUpdateNode) {
     
    }
  }
  