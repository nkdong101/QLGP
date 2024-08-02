
import { FormDirectionType, FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { GetGlobalId } from "../../Functions";
import { Para } from "../../Para";

export default class fixed_assets {
  /** @type {string} - description */
  Code;
  /** @type {number} - description */
  Type_id;
  /** @type {string} - description */
  Type_Name;
  /** @type {string} - description */
  Producer_id;
  /** @type {string} - description */
  Producer_Name;
  /** @type {string} - description */
  Model;
  /** @type {string} - description */
  Serial;
  /** @type {string} - description */
  Purchase_Date;
  /** @type {number} - description */
  Order_id;
  /** @type {number} - description */
  Order_detail_id;
  /** @type {number} - description */
  Ware_house_id;
  /** @type {string} - description */
  Invoice_code;
  /** @type {string} - description */
  Invoice_Date;
  /** @type {string} - description */
  Invoice_File;
  /** @type {number} - description */
  Currency_VND;
  Unit_cost;
  /** @type {string} - description */
  Currency_Code;
  /** @type {number} - description */
  CHF;
  /** @type {number} - description */
  Office_id;
  /** @type {string} - description */
  Project_Code;
  /** @type {string} - description */
  Initial_Holder_id;
  /** @type {string} - description */
  Initial_Holder_Name;
  /** @type {string} - description */
  Curent_Holder_Id;
  /** @type {string} - description */
  Curent_Holder_Name;
  /** @type {number} - description */
  Warranty_Period;
  /** @type {boolean} - description */
  Maintenance;
  /** @type {number} - description */
  Estimated_Life_Min;
  /** @type {number} - description */
  Estimated_Life_Max;
  /** @type {string} - description */
  Disposal_Date;
  /** @type {string} - description */
  Note;
  /** @type {string} - description */
  Images;
  /** @type {number} - description */
  Ticket_Number;
  /** @type {string} - description */
  Name;
  /** @type {number} - description */
  State;
  /** @type {number} - description */
  Use_Type_id;
  /** @type {string} - description */
  Registration_Date;
  /** @type {string} - description */
  Engine_no;
  /** @type {string} - description */
  Chassis_no;
  /** @type {string} - description */
  Check_Date;
  /** @type {string} - description */
  Insurance_Date;
  /** @type {string} - description */
  Legal_Owner;
  /** @type {number} - description */
  Vehicle_Type_id;
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


  tmp_id;



  /**
   *
   * @param {fixed_assets} obj
   */
  constructor(obj) {
    this.tmp_id = GetGlobalId();
    this.update(obj);
  }
  /**
   *
   * @param {fixed_assets} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      Code: new FormElement({
        label: "Asset Number",
        model: "Code",
        type: FormElementType.text,
      }),
      Type_id: new FormElement({
        label: "Asset Type",
        model: "Type_id",
        type: FormElementType.select,
        options: Para.fixed_asset_type_Get_List
      }),
      Type_Name: new FormElement({
        label: "Type_Name",
        model: "Type_Name",
        type: FormElementType.text,
      }),
      Producer_id: new FormElement({
        label: "Producer",
        model: "Producer_id",
        type: FormElementType.select,
        options: Para.producer_Get_List
      }),
      Producer_Name: new FormElement({
        label: "Producer_Name",
        model: "Producer_Name",
        type: FormElementType.text,
      }),
      Model: new FormElement({
        label: "Model",
        model: "Model",
        type: FormElementType.text,
      }),
      Serial: new FormElement({
        label: "Serial No.",
        model: "Serial",
        type: FormElementType.text,
      }),
      Purchase_Date: new FormElement({
        label: "Purchase Date",
        model: "Purchase_Date",
        type: FormElementType.date,
        required: true,
        disabled(data){
          if(data.Ware_house_id)
          return true;
        }
      }),
      Order_id: new FormElement({
        label: "Order_id",
        model: "Order_id",
        type: FormElementType.text,
      }),
      Order_detail_id: new FormElement({
        label: "Order_detail_id",
        model: "Order_detail_id",
        type: FormElementType.text,
      }),
      Ware_house_id: new FormElement({
        label: "Ware_house_id",
        model: "Ware_house_id",
        type: FormElementType.text,
      }),
      Invoice_code: new FormElement({
        label: "Invoice_code",
        model: "Invoice_code",
        type: FormElementType.text,
      }),
      Invoice_Date: new FormElement({
        label: "Invoice_Date",
        model: "Invoice_Date",
        type: FormElementType.text,
      }),
      Invoice_File: new FormElement({
        label: "Invoice_File",
        model: "Invoice_File",
        type: FormElementType.text,
      }),
      Unit_cost: new FormElement({
        label: "Unit cost",
        model: "Unit_cost",
        type: FormElementType.number,
      }),
      Currency_VND: new FormElement({
        label: "Currency in purchase (VND)",
        model: "Currency_VND",
        type: FormElementType.number,
      }),
      Currency_Code: new FormElement({
        label: "Currency Code",
        model: "Currency_Code",
        type: FormElementType.text,
        disabled: true
      }),
      CHF: new FormElement({
        label: "CHF",
        model: "CHF",
        type: FormElementType.text,
      }),
      Office_id: new FormElement({
        label: "Office",
        model: "Office_id",
        type: FormElementType.text,
      }),
      Project_Code: new FormElement({
        label: "Project Code",
        model: "Project_Code",
        type: FormElementType.text,
      }),
      Initial_Holder_id: new FormElement({
        label: "Initial Holder id",
        model: "Initial_Holder_id",
        type: FormElementType.text,
      }),
      Initial_Holder_Name: new FormElement({
        label: "Initial Holder",
        model: "Initial_Holder_Name",
        type: FormElementType.text,
        disabled: true,
      }),
      Curent_Holder_Id: new FormElement({
        label: "Curent_Holder_Id",
        model: "Curent_Holder_Id",
        type: FormElementType.text,
      }),
      Curent_Holder_Name: new FormElement({
        label: "Curent Holder",
        model: "Curent_Holder_Name",
        type: FormElementType.text,
        disabled: true,
      }),
      Warranty_Period: new FormElement({
        label: "Warranty Period",
        model: "Warranty_Period",
        type: FormElementType.number,
      }),
      Maintenance: new FormElement({
        label: "Maintenance",
        model: "Maintenance",
        type: FormElementType.checkbox,
      }),
      Estimated_Life_Min: new FormElement({
        label: "Estimated Min",
        model: "Estimated_Life_Min",
        type: FormElementType.number,
      }),
      Estimated_Life_Max: new FormElement({
        label: "Estimated Max",
        model: "Estimated_Life_Max",
        type: FormElementType.number,
      }),
      Disposal_Date: new FormElement({
        label: "Disposal_Date",
        model: "Disposal_Date",
        type: FormElementType.text,
      }),
      Note: new FormElement({
        label: "Note",
        model: "Note",
        type: FormElementType.text,
        attr: {
          type: 'textarea'
        }
      }),
      Images: new FormElement({
        // label: "File attachment",
        model: "Images",
        type: FormElementType.file,
        options: Para.FixedAssetsImage
      }),
      Ticket_Number: new FormElement({
        label: "Ticket_Number",
        model: "Ticket_Number",
        type: FormElementType.text,
      }),
      Name: new FormElement({
        label: "Name",
        model: "Name",
        type: FormElementType.text,
      }),
      State: new FormElement({
        label: "State",
        model: "State",
        type: FormElementType.text,
      }),
      Use_Type_id: new FormElement({
        label: "Use_Type_id",
        model: "Use_Type_id",
        type: FormElementType.text,
      }),
      Registration_Date: new FormElement({
        label: "Registration Date",
        model: "Registration_Date",
        type: FormElementType.datePicker,
      }),
      Engine_no: new FormElement({
        label: "Engine no",
        model: "Engine_no",
        type: FormElementType.text,
      }),
      Chassis_no: new FormElement({
        label: "Chassis no",
        model: "Chassis_no",
        type: FormElementType.text,
      }),
      Check_Date: new FormElement({
        label: "Check Date",
        model: "Check_Date",
        type: FormElementType.datePicker,
      }),
      Insurance_Date: new FormElement({
        label: "Insurance Date",
        model: "Insurance_Date",
        type: FormElementType.datePicker,
      }),
      Legal_Owner: new FormElement({
        label: "Legal Owner",
        model: "Legal_Owner",
        type: FormElementType.text,
      }),
      Vehicle_Type_id: new FormElement({
        label: "Vehicle Type",
        model: "Vehicle_Type_id",
        type: FormElementType.select,
        options: Para.Para_VehicleType
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
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        new FormElement({
          child: [
            new FormElement({
              col: 24,
              direction: FormDirectionType.vertical,
              child: [
                new FormElement({
                  label: 'More Fixed Assets Info',
                  type: FormElementType.label
                }),
                new FormElement({
                  child: [
                    this._formElements.Serial.set(p => p.col = 6),

                    this._formElements.Currency_Code.set(p => p.col = 5),
                    this._formElements.Unit_cost.set(p => p.col = 5).set(p => p.labelWidth = 105),
                    this._formElements.Currency_VND.set(p => p.col = 8).set(p => p.labelWidth = 180),

                  ]
                }),
                new FormElement({
                  child: [
                    this._formElements.Warranty_Period.set(p => p.col = 6),
                    this._formElements.Maintenance.set(p => p.col = 5),
                    this._formElements.Estimated_Life_Min.set(p => p.col = 5).set(p => p.labelWidth = 105),
                    this._formElements.Estimated_Life_Max.set(p => p.col = 8).set(p => p.labelWidth = 180),
                  ]
                }),
                new FormElement({
                  label: 'Vehicle Info',
                  type: FormElementType.label,
                  /**
                   *
                   * @param {fixed_assets} data
                   */
                  isVisible(data) {
                    if (data.Type_id == 4) {
                      return true;
                    }
                  }
                }),
                new FormElement({
                  child: [
                    this._formElements.Vehicle_Type_id.set(p => p.col = 6),
                    this._formElements.Registration_Date.set(p => p.col = 6),
                    this._formElements.Engine_no.set(p => p.col = 6),
                    this._formElements.Chassis_no.set(p => p.col = 6),
                  ],
                  /**
                   *
                   * @param {fixed_assets} data
                   */
                  isVisible(data) {
                    if (data.Type_id == 4) {
                      return true;
                    }
                  }
                }),
                new FormElement({
                  child: [
                    this._formElements.Check_Date.set(p => p.col = 6),
                    this._formElements.Insurance_Date.set(p => p.col = 6),
                    this._formElements.Legal_Owner.set(p => p.col = 6),
                  ],
                  /**
                   *
                   * @param {fixed_assets} data
                   */
                  isVisible(data) {
                    if (data.Type_id == 4) {
                      return true;
                    }
                  }
                }),
                this._formElements.Note,
                this._formElements.Images,
              ]
            }),
          ]
        }),

      ]
    });
  }

  form2() {
    return new FormInfo({
      formData: this,
      elements: [
        new FormElement({
          child: [
            new FormElement({
              col: 24,
              direction: FormDirectionType.vertical,
              child: [
                new FormElement({
                  label: 'Fixed Assets Info',
                  type: FormElementType.label
                }),

                new FormElement({
                  child: [
                    this._formElements.Name.set(p => p.col = 18),
                    this._formElements.Purchase_Date.set(p => p.col = 6),
                  ]
                }),
                new FormElement({
                  child: [
                    this._formElements.Project_Code.set(p => p.col = 6),
                    this._formElements.Type_id.set(p => p.col = 6),
                    this._formElements.Producer_id.set(p => p.col = 6),
                    this._formElements.Model.set(p => p.col = 6),
                  ]
                }),
                new FormElement({
                  child: [
                    this._formElements.Code.set(p => p.col = 6),
                    this._formElements.Serial.set(p => p.col = 6),
                    this._formElements.Unit_cost.set(p => p.col = 6),
                    this._formElements.Currency_Code.set(p => p.col = 6).set(p => p.disabled = false),
                  ]
                }),
                new FormElement({
                  child: [
                    this._formElements.Warranty_Period.set(p => p.col = 6),
                    this._formElements.Maintenance.set(p => p.col = 6),
                    this._formElements.Estimated_Life_Min.set(p => p.col = 6),
                    this._formElements.Estimated_Life_Max.set(p => p.col = 6),
                  ]
                }),
                new FormElement({
                  label: 'Vehicle Info',
                  type: FormElementType.label,
                  /**
                   *
                   * @param {fixed_assets} data
                   */
                  isVisible(data) {
                    if (data.Type_id == 4) {
                      return true;
                    }
                  }
                }),
                new FormElement({
                  child: [
                    this._formElements.Vehicle_Type_id.set(p => p.col = 6),
                    this._formElements.Registration_Date.set(p => p.col = 6),
                    this._formElements.Engine_no.set(p => p.col = 6),
                    this._formElements.Chassis_no.set(p => p.col = 6),
                  ],
                  /**
                   *
                   * @param {fixed_assets} data
                   */
                  isVisible(data) {
                    if (data.Type_id == 4) {
                      return true;
                    }
                  }
                }),
                new FormElement({
                  child: [
                    this._formElements.Check_Date.set(p => p.col = 6),
                    this._formElements.Insurance_Date.set(p => p.col = 6),
                    this._formElements.Legal_Owner.set(p => p.col = 6),
                  ],
                  /**
                   *
                   * @param {fixed_assets} data
                   */
                  isVisible(data) {
                    if (data.Type_id == 4) {
                      return true;
                    }
                  }
                }),
                new FormElement({
                  child:[
                    // this._formElements.Initial_Holder_id,
                    this._formElements.Initial_Holder_Name,
                    this._formElements.Curent_Holder_Name
                  ]
                }),
                this._formElements.Note,
                this._formElements.Images,
              ]
            }),
          ]
        }),

      ]
    });
  }

  formView() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Code.set(p => p.disabled = true),
        this._formElements.Serial.set(p => p.disabled = true),
        this._formElements.Producer_id.set(p => p.disabled = true),
        this._formElements.Model.set(p => p.disabled = true),

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
