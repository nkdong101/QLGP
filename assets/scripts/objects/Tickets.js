
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";

export default class Tickets {
  /** @type {number} - description */
  Fixed_Asset_id;
  /** @type {string} - description */
  Content;
  /** @type {number} - description */
  State;
  /** @type {string} - description */
  Receive_User;
  /** @type {string} - description */
  Receive_Date;
  /** @type {string} - description */
  Act_User;
  /** @type {string} - description */
  Act_Name;
  /** @type {number} - description */
  Order_id;
  /** @type {string} - description */
  Finish_Date;
  /** @type {number} - description */
  Total_Comment;
  /** @type {string} - description */
  Id;
  /** @type {string} - description */
  DateUpdate;
  /** @type {string} - description */
  DateCreate;
  /** @type {string} - description */
  UserCreate;
  /** @type {string} - description */
  UserUpdate;




  /**
   *
   * @param {Tickets} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Tickets} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      Fixed_Asset_id: new FormElement({
        label: "Fixed_Asset_id",
        model: "Fixed_Asset_id",
        type: FormElementType.text,
      }),
      Content: new FormElement({
        label: "Your request",
        model: "Content",
        type: FormElementType.text,
        attr: {
          type: 'textarea'
        }
      }),
      State: new FormElement({
        label: "State",
        model: "State",
        type: FormElementType.select,
        options: Para.TicketsState,
        disabled: true
      }),
      Receive_User: new FormElement({
        label: "Receive User",
        model: "Receive_User",
        type: FormElementType.select,
        options: Para.Para_Account.set(p => p.placeholder = ""),
        disabled: true

      }),
      Receive_Date: new FormElement({
        label: "Receive Date",
        model: "Receive_Date",
        type: FormElementType.datePicker,
        disabled: true

      }),
      Act_User: new FormElement({
        label: "Act User",
        model: "Act_User",
        type: FormElementType.text,
        disabled: true

      }),
      Act_Name: new FormElement({
        label: "Act Name",
        model: "Act_Name",
        type: FormElementType.text,
      }),
      Order_id: new FormElement({
        label: "Order_id",
        model: "Order_id",
        type: FormElementType.text,
      }),
      Finish_Date: new FormElement({
        label: "Finish Date",
        model: "Finish_Date",
        type: FormElementType.datePicker,

      }),
      Total_Comment: new FormElement({
        label: "Total_Comment",
        model: "Total_Comment",
        type: FormElementType.text,
      }),
      Id: new FormElement({
        label: "Id",
        model: "Id",
        type: FormElementType.text,
      }),
      DateUpdate: new FormElement({
        label: "DateUpdate",
        model: "DateUpdate",
        type: FormElementType.text,
      }),
      DateCreate: new FormElement({
        label: "DateCreate",
        model: "DateCreate",
        type: FormElementType.text,
      }),
      UserCreate: new FormElement({
        label: "UserCreate",
        model: "UserCreate",
        type: FormElementType.text,
      }),
      UserUpdate: new FormElement({
        label: "UserUpdate",
        model: "UserUpdate",
        type: FormElementType.text,
      }),
      Fixed_Code: new FormElement({
        label: "Code",
        model: "Fixed_Code",
        type: FormElementType.text,
        disabled: true
      }),
      Fixed_Producer: new FormElement({
        label: "Producer",
        model: "Fixed_Producer",
        type: FormElementType.text,
        disabled: true
      }),
      Fixed_Model: new FormElement({
        label: "Model",
        model: "Fixed_Model",
        type: FormElementType.text,
        disabled: true
      }),
      Fixed_Serial: new FormElement({
        label: "Serial",
        model: "Fixed_Serial",
        type: FormElementType.text,
        disabled: true
      }),

    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Content,
        this._formElements.State,
      ]
    });
  }

  formFA() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Fixed_Code,
        this._formElements.Fixed_Serial,
        this._formElements.Fixed_Model,
        this._formElements.Fixed_Producer,
      ]
    });
  }

  formDetail() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Content,
        this._formElements.State,
        this._formElements.Receive_User,
        this._formElements.Receive_Date,
        this._formElements.Act_Name,
        this._formElements.Finish_Date,
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
