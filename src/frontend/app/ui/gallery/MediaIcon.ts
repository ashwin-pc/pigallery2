import {Utils} from '../../../../common/Utils';
import {Config} from '../../../../common/config/public/Config';
import {MediaBaseDTO, MediaDTO} from '../../../../common/entities/MediaDTO';

export class MediaIcon {


  protected replacementSizeCache: number | boolean = false;

  constructor(public media: MediaBaseDTO) {

  }

  getExtension(): string {
    return this.media.name.substr(this.media.name.lastIndexOf('.') + 1);
  }

  iconLoaded(): void {
    this.media.readyIcon = true;
  }

  isIconAvailable(): boolean {
    return this.media.readyIcon;
  }

  getRelativePath(): string {
    return Utils.concatUrls(this.media.directory.path, this.media.directory.name, this.media.name);
  }

  getIconPath(): string {
    return Utils.concatUrls(Config.Client.urlBase,
      '/api/gallery/content/',
      this.media.directory.path, this.media.directory.name, this.media.name, 'icon');
  }

  getMediaPath(): string {
    return Utils.concatUrls(Config.Client.urlBase,
      '/api/gallery/content/',
      this.media.directory.path, this.media.directory.name, this.media.name);
  }

  getBestFitMediaPath(): string {
    return Utils.concatUrls(this.getMediaPath(), '/bestFit');
  }


  equals(other: MediaDTO | MediaIcon): boolean {
    // is gridphoto
    if (other instanceof MediaIcon) {
      return this.media.directory.path === other.media.directory.path &&
        this.media.directory.name === other.media.directory.name && this.media.name === other.media.name;
    }

    // is media
    if (other.directory) {
      return this.media.directory.path === other.directory.path &&
        this.media.directory.name === other.directory.name && this.media.name === other.name;
    }

    return false;
  }
}
