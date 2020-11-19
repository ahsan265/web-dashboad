import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userservice';
import { first, startWith, map } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alertservice';

import { shareresservice } from 'src/app/services/shareres.service';
import { credentialservice } from '../../userservice/credentialservice';
import { Observable } from 'rxjs';
import { User } from '../../usermodel/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  loading = false;
  registerform:FormGroup;
  returnUrl: string;
  user:User;
  submitted = false;
  myControl = new FormControl();
  options: string[] = ['Karachi'
    ,'Lahore',
    ,'Faisalābād'
    ,'Serai'
    ,'Rāwalpindi'
    ,'Multān'
    ,'Gujrānwāla'
    ,'Hyderābād City'
    ,'Peshāwar'
    ,'Abbottābād'
    ,'Islamabad'
    ,'Quetta'
    ,'Bannu'
    ,'Bahāwalpur'
    ,'Sargodha'
    ,'Siālkot City'
    ,'Sukkur'
    ,'Lārkāna'
    ,'Sheikhupura'
    ,'Mīrpur Khās'
    ,'Rahīmyār Khān'
    ,'Kohāt'
    ,'Jhang Sadr'
    ,'Gujrāt'
    ,'Bardār'
    ,'Kasūr'
    ,'Dera Ghāzi Khān'
    ,'Masīwāla'
    ,'Nawābshāh'
    ,'Okāra'
    ,'Gilgit'
    ,'Chiniot'
    ,'Sādiqābād'
    ,'Turbat'
    ,'Dera Ismāīl Khān'
    ,'Chaman'
    ,'Zhob'
    ,'Mehra'
    ,'Parachinār'
    ,'Gwādar'
    ,'Kundiān'
    ,'Shahdād Kot'
    ,'Harīpur'
    ,'Matiāri'
    ,'Dera Allāhyār'
    ,'Lodhrān'
    ,'Batgrām'
    ,'Thatta'
    ,'Bāgh'
    ,'Badīn'
    ,'Mānsehra'
    ,'Ziārat'
    ,'Muzaffargarh'
    ,'Tando Allāhyār'
    ,'Dera Murād Jamāli'
    ,'Karak'
    ,'Mardan'
    ,'Uthal'
    ,'Nankāna Sāhib'
    ,'Bārkhān'
    ,'Hāfizābād'
    ,'Kotli'
    ,'Loralai'
    ,'Dera Bugti'
    ,'Jhang City'
    ,'Sāhīwāl'
    ,'Sānghar'
    ,'Pākpattan'
    ,'Chakwāl'
    ,'Khushāb'
    ,'Ghotki'
    ,'Kohlu'
    ,'Khuzdār'
    ,'Awārān'
    ,'Nowshera'
    ,'Chārsadda'
    ,'Qila Abdullāh'
    ,'Bahāwalnagar'
    ,'Dādu'
    ,'Alīābad'
    ,'Lakki Marwat'
    ,'Chilās'
    ,'Pishin'
    ,'Tānk'
    ,'Chitrāl'
    ,'Qila Saifullāh'
    ,'Shikārpur'
    ,'Panjgūr'
    ,'Mastung'
    ,'Kalāt'
    ,'Gandāvā'
    ,'Khānewāl'
    ,'Nārowāl'
    ,'Khairpur'
    ,'Malakand'
    ,'Vihāri'
    ,'Saidu Sharif'
    ,'Jhelum'
    ,'Mandi Bahāuddīn'
    ,'Bhakkar'
    ,'Toba Tek Singh'
    ,'Jāmshoro'
    ,'Khārān'
    ,'Umarkot'
    ,'Hangu'
    ,'Timargara'
    ,'Gākuch'
    ,'Jacobābād'
    ,'Alpūrai'
    ,'Miānwāli'
    ,'Mūsa Khel Bāzār'
    ,'Naushahro Fīroz'
    ,'New Mīrpur'
    ,'Daggar'
    ,'Eidgāh'
    ,'Sibi'
    ,'Dālbandīn'
    ,'Rājanpur'
    ,'Leiah'
    ,'Upper Dir'
    ,'Tando Muhammad Khān'
    ,'Attock City'
    ,'Rāwala Kot'
    ,'Swābi'
    ,'Kandhkot'
    ,'Dasu'
    ,'Athmuqam'
    ];
  filteredOptions: Observable<string[]>;
  constructor(private fb:FormBuilder,
    private router:Router,
    private userService:UserService,
    private alertService:AlertService,
    private emailparam:credentialservice
    ) { 

   
    }
  register()
  {
    this.submitted = true;
    if (this.registerform.invalid) {
        return;
    }
    this.userService.register(this.registerform.value)
        .pipe(first())
        .subscribe(
            data => {
                           this.emailparam.setemail(this.registerform.value.email)
                     this.alertService.success('Registration successful', true)
                this.router.navigate(['/userverified',this.registerform.value.email]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
               
            });

    this.registerform.clearAsyncValidators()
  }

  selectcityautocomplete()
  {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.registerform = this.fb.group({
   
      name: [null, Validators.required],
      email: [null, Validators.required,Validators.email],
      password: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null, Validators.required],
      city: [null, Validators.required],
  });
  //this.emailparam.emailobs$(data=>this.email=data);
  this.selectcityautocomplete();
  }
   // convenience getter for easy access to form fields
   get f() { return this.registerform.controls; }
}
