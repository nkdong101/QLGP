
import { FormDirectionType, FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";
import { GetStartMonth, GetTimeNow } from "../Functions";

export default class Fixed_Asset_Inventory_Filter {
  /** @type {string} - description */
  From = GetStartMonth();
  /** @type {string} - description */
  To = GetTimeNow();
  /** @type {string} - description */
  State;
  /** @type {string} - description */
  iFixed_assset_id;




  /**
   *
   * @param {Fixed_Asset_Inventory_Filter} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Fixed_Asset_Inventory_Filter} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      From: new FormElement({
        label: "From Date",
        model: "From",
        type: FormElementType.datePicker,
      }),
      To: new FormElement({
        label: "To Date",
        model: "To",
        type: FormElementType.datePicker,
      }),
      State: new FormElement({
        label: "State",
        model: "State",
        type: FormElementType.select,
        options: Para.InventoryState.set(p => p.placeholder = "All")
      }),


    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        new FormElement({
          direction: FormDirectionType.horizontal,
          child: [
            this._formElements.From,
            this._formElements.To,
            this._formElements.State,]
        })
      ]
    });
  }



  toJSON() {
    return {
      ...this,
      _formElements: undefined
    }
  }

}
