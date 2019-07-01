import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import Storage from '@aws-amplify/storage';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent {

  photoUrl: string;
  hasPhoto = false;
  uploading = false;
  s3ImageFile: any = null;
  s3ImagePath = '';
  _storageOptions: any = { level: 'public' };
  errorMessage: string;
  protected logger: any;

  constructor(@Inject(AmplifyService) protected amplifyService: AmplifyService) {
    this.logger = this.amplifyService.logger('PhotoPickerComponent');
  }

  @Input()
  set url(url: string) {
    this.photoUrl = url;
    this.hasPhoto = true;
  }

  @Input()
  set storageOptions(storageOptions: any) {
    this._storageOptions = Object.assign(this._storageOptions, storageOptions);
  }

  @Input()
  set path(path: string) {
    this.s3ImagePath = path;
  }

  @Input()
  set data(data: any) {
    this.photoUrl = data.url;
    this.s3ImagePath = data.path;
    this._storageOptions = Object.assign(this._storageOptions, data.storageOptions);
    this.hasPhoto = true;
  }

  @Output()
  picked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  loaded: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  uploaded: EventEmitter<Object> = new EventEmitter<Object>();

  ngOnInit() {
    if (!this.amplifyService.storage()) {
      throw new Error('Storage module not registered on AmplifyService provider');
    }
  }

  pick(evt) {
    const file = evt.target.files[0];
    if (!file) { return; }
    if (!this._storageOptions.contentType) {
      this._storageOptions.contentType = file.type;
    }
    const { name, size, type } = file;
    this.picked.emit(file);

    const fileName = file.name.split('.');
    const fileExt = fileName.pop();
    this.s3ImagePath = `${this.s3ImagePath}/${fileName.join('')}-${new Date().toISOString()}.${fileExt}`;

    this.s3ImageFile = file;
    const that = this;
    const reader = new FileReader();
    reader.onload = function(e) {
      const target: any = e.target;
      const url = target.result;
      that.photoUrl = url;
      that.hasPhoto = true;
      that.loaded.emit(url);
    };
    reader.readAsDataURL(file);
  }

  uploadFile() {
    this.uploading = true;
    this.amplifyService.storage().put(
      this.s3ImagePath,
      this.s3ImageFile, this._storageOptions)
      .then(result => {
        this.uploaded.emit(result);
        this.completeFileUpload();
      })
      .catch(error => {
        this.completeFileUpload(error);
      });
  }

  completeFileUpload(error?: any) {
    if (error) {
      return this._setError(error);
    }
    this.s3ImagePath = '';
    this.photoUrl = null;
    this.s3ImageFile = null;
    this.uploading = false;
  }

  onPhotoError() {
    this.hasPhoto = false;
  }

  onAlertClose() {
    this._setError(null);
  }

  _setError(err) {
    if (!err) {
      this.errorMessage = null;
      return;
    }
    this.errorMessage = err.message || err;
  }

}
