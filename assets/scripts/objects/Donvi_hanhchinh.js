import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";
export default class Donvi_hanhchinh {
    /** @type {number} - description */
    Level;
    /** @type {string} - description */
    Name;
    /** @type {number} - description */
    Index;
    /** @type {number} - description */
    Parent_id;
    /** @type {number} - description */
    Id;
    /** @type {number} - description */
    DateUpdate;
    /** @type {number} - description */
    DateCreate;
    /** @type {number} - description */
    UserCreate;
    /** @type {number} - description */
    UserUpdate;
   

    _formElements = {
        Level: new FormElement({
            label: "Cấp độ",
            model: "Level",
            type: FormElementType.select,
            options: Para.Level,
            disabled: true,
        }),
        Name: new FormElement({
            label:  "Tỉnh" ,
            model: "Name",
            type: FormElementType.text,
            // disabled: true,
        }),
        Index: new FormElement({
            label: "Mã số",
            model: "Index",
            type: FormElementType.text,
            // disabled: true,
            // options: Para.Para_Active,
        }),
        Parent_id: new FormElement({
            label: "ID cấp trên",
            model: "Parent_id",
            type: FormElementType.text,
            
            // labelWidth: 140,
        }),
        Parent: new FormElement({
            label: "Tỉnh",
            model: "tinh",
            type: FormElementType.text,
            disabled: true,

            // labelWidth: 140,
        }),
        Id: new FormElement({
            label: "Id",
            model: "Id",
            type: FormElementType.text,
        }),


    };

    /**
     *
     * @param {Donvi_hanhchinh} obj
     */
    constructor(obj) {
        this.update(obj);
    }
    /**
     *
     * @param {Donvi_hanhchinh} obj
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
            labelWidth: 100,
            formData: this,
            elements: [
                this._formElements.Index,
                this._formElements.Name,
                // this._formElements.Parent,
                // this._formElements.Level,

            ]
        });
    }
}