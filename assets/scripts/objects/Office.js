import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
export default class Office {
  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Serial;
  /** @type {number} - description */
  Use;
  /** @type {number} - description */
  OfficeType;
  /** @type {number} - description */
  Sequency;
  /** @type {number} - description */
  Id;
  /** @type {string} - description */
  DateUpdate;
  /** @type {string} - description */
  DateCreate;
  /** @type {string} - description */
  UserCreate;
  /** @type {string} - description */
  UserUpdate;


  _formElements = {
    Name: new FormElement({
      label: "Name",
      model: "Name",
      type: FormElementType.text,
    }),
    Serial: new FormElement({
      label: "Serial",
      model: "Serial",
      type: FormElementType.text,
    }),
    Use: new FormElement({
      label: "Use",
      model: "Use",
      type: FormElementType.select,
      options: Para.Para_Active,
    }),
    OfficeType: new FormElement({
      label: "OfficeType",
      model: "OfficeType",
      type: FormElementType.select,
      options: Para.OfficeType,
    }),
    Sequency: new FormElement({
      label: "Sequency",
      model: "Sequency",
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

  };

  /**
   *
   * @param {Office} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Office} obj
   */
  update(obj) {
    Object.assign(this, obj);
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined,
    }
  }
  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Serial,
        this._formElements.Name,
        this._formElements.OfficeType,
        this._formElements.Use,
        this._formElements.Sequency,

      ]
    });
  }
}
