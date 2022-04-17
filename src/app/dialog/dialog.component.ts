import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  sections:any=["Audit","Supervision","CyberSecurity"];

  employeeForm !: FormGroup;

  actionBtn:string="Save";

  constructor(private formBuilder : FormBuilder, private api : ApiService,
              @Inject(MAT_DIALOG_DATA) public editData:any,
              private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeFirstName : ['',Validators.required],
      employeeLastName : ['',Validators.required],
      employeeRank : ['',Validators.required],
      employeeBirthDate : ['',Validators.required],
      employeePhoneNumber : ['',Validators.required],
      employeeSection : ['',Validators.required]
    })
    if(this.editData){
      this.actionBtn = "Update";
      this.employeeForm.controls['employeeFirstName'].setValue(this.editData.employeeFirstName);
      this.employeeForm.controls['employeeLastName'].setValue(this.editData.employeeLastName);
      this.employeeForm.controls['employeeRank'].setValue(this.editData.employeeRank);
      this.employeeForm.controls['employeeBirthDate'].setValue(this.editData.employeeBirthDate);
      this.employeeForm.controls['employeePhoneNumber'].setValue(this.editData.employeePhoneNumber);
      this.employeeForm.controls['employeeSection'].setValue(this.editData.employeeSection);
    }
  }
    addEmployee(){
      if (!this.editData){
        if(this.employeeForm.valid){
          this.api.postEmployee(this.employeeForm.value)
            .subscribe({
              next:(res)=>{
                alert("Employee added successfully")
                this.employeeForm.reset()
                this.dialogRef.close('save');
              },
              error:()=>{
                alert("Failed to add the employee !!!")
              }
            })
        }
      }else {
        this.updateEmployee();
      }
    }

  updateEmployee(){
    this.api.putEmployee(this.employeeForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Employee updated successfully")
          this.employeeForm.reset()
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Failed to update the employee !!!")
        }
      })
  }
  }
