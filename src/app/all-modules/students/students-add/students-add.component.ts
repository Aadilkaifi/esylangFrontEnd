import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-students-add",
  templateUrl: "./students-add.component.html",
  styleUrls: ["./students-add.component.css"],
})
export class StudentsAddComponent implements OnInit {
  public addStudentsForm: FormGroup;
  public url = "studentsList";
  public pipe = new DatePipe("en-US");
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Add students form validation
    this.addStudentsForm = this.formBuilder.group({
      FirstName: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      studentId: ["", [Validators.required]],
      class: ["", [Validators.required]],
      mobileNumber: ["", [Validators.required]],
      fathersName: ["", [Validators.required]],
      address: ["", [Validators.required]],
    });
  }

  // Add students submit call
  addStudents() {
    let DateJoin = this.pipe.transform(
      this.addStudentsForm.value.dob,
      "d MMM y"
    );
    let obj = {
      idNo: this.addStudentsForm.value.studentId,
      name: this.addStudentsForm.value.FirstName,
      class: this.addStudentsForm.value.class,
      dob: DateJoin,
      parentName: this.addStudentsForm.value.fathersName,
      mobileNumber: this.addStudentsForm.value.mobileNumber,
      address: this.addStudentsForm.value.address,
    };
    if (this.addStudentsForm.valid) {
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.router.navigate(["/students/students-list"]);
        this.toastr.success("Students added sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }
}
