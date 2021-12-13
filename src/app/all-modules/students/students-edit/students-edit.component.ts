import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-students-edit",
  templateUrl: "./students-edit.component.html",
  styleUrls: ["./students-edit.component.css"],
})
export class StudentsEditComponent implements OnInit {
  public editId;
  public editStudentsForm: FormGroup;
  public pipe = new DatePipe("en-US");
  public url = "studentsList";
  public lstStudents;
  public obj;
  public setDate;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadStudents();
    //getting edit id of selected student list
    this.editId = parseInt(this.route.snapshot.queryParams["id"]);
    //editstudents form validation
    this.editStudentsForm = this.formBuilder.group({
      FirstName: ["", [Validators.required]],
      studentId: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      class: ["", [Validators.required]],
      mobileNumber: ["", [Validators.required]],
      fathersName: ["", [Validators.required]],
      address: ["", [Validators.required]],
    });
    setTimeout(() => {
      //<<<---using ()=> syntax
      this.edit();
    }, 1000);
  }

  // Get Students List  Api Call
  loadStudents() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstStudents = data;
    });
  }

  // Edit students Submit call
  editStudents() {
    let DateJoin = this.pipe.transform(
      this.editStudentsForm.value.dob,
      "d MMM y"
    );
    if (isNaN(this.editId)) {
      this.obj = {
        idNo: this.editStudentsForm.value.studentId,
        name: this.editStudentsForm.value.FirstName,
        class: this.editStudentsForm.value.class,
        dob: DateJoin,
        parentName: this.editStudentsForm.value.fathersName,
        mobileNumber: this.editStudentsForm.value.mobileNumber,
        address: this.editStudentsForm.value.address,
        id: 1,
      };
    } else {
      this.obj = {
        idNo: this.editStudentsForm.value.studentId,
        name: this.editStudentsForm.value.FirstName,
        class: this.editStudentsForm.value.class,
        dob: DateJoin,
        parentName: this.editStudentsForm.value.fathersName,
        mobileNumber: this.editStudentsForm.value.mobileNumber,
        address: this.editStudentsForm.value.address,
        id: this.editId,
      };
    }

    if (this.editStudentsForm.valid) {
      this.srvModuleService.update(this.obj, this.url).subscribe((data) => {
        this.router.navigate(["/students/students-list"]);
        this.toastr.success("Students edited sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }
  }

  // set values to students form
  edit() {
    if (isNaN(this.editId)) {
      const index = this.lstStudents.findIndex((item) => {
        return item.id === 1;
      });
      let toSetValues = this.lstStudents[index];
      this.editStudentsForm.patchValue({
        studentId: toSetValues.idNo,
        FirstName: toSetValues.name,
        class: toSetValues.class,
        dob: toSetValues.dob,
        mobileNumber: toSetValues.mobileNumber,
        address: toSetValues.address,
        fathersName: toSetValues.parentName,
      });
      this.setDate = toSetValues.dob;
    } else {
      const index = this.lstStudents.findIndex((item) => {
        return item.id === this.editId;
      });
      let toSetValues = this.lstStudents[index];
      this.editStudentsForm.patchValue({
        studentId: toSetValues.idNo,
        FirstName: toSetValues.name,
        class: toSetValues.class,
        dob: toSetValues.dob,
        mobileNumber: toSetValues.mobileNumber,
        address: toSetValues.address,
        fathersName: toSetValues.parentName,
      });
      this.setDate = toSetValues.dob;
    }
  }
}
