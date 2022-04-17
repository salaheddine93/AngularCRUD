import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";
import {ApiService} from "./services/api.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularCRUD';
  displayedColumns: string[] = ['employeeFirstName', 'employeeLastName', 'employeeRank', 'employeeBirthDate', 'employeePhoneNumber', 'employeeSection', 'Action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog:MatDialog, private api : ApiService) {
  }

  ngOnInit(): void {
        this.getAllEmployees();
    }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'40%'
    }).afterClosed().subscribe(val=>{
      this.getAllEmployees();
    })
  }
  getAllEmployees(){
    return this.api.getEmployee()
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort;
        },
        error:(err)=>{
          console.log("Failed to load the list of employees")
        }
      })
  }

  editEmployee(row:any){
    this.dialog.open(DialogComponent, {
      width:'40%',
      data: row
    }).afterClosed().subscribe(val=>{
      if (val=='update'){
        this.getAllEmployees();
      }
    })
  }

  deleteEmployee(id:number){
    this.api.deleteEmployee(id)
      .subscribe({
        next:(res)=>{
          alert("Employee deleted successfully");
          this.getAllEmployees();
        },
        error:(err)=>{
          alert("Failed to delete the selected employee");
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
