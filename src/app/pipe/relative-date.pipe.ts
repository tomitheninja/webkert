import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { differenceInMilliseconds } from 'date-fns';

@Pipe({
  name: 'relativeDate',
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: Timestamp | Date): string {
    if (value instanceof Date) {
      value = Timestamp.fromDate(value);
    }
    const diff = differenceInMilliseconds(Date.now(), value.seconds * 1000);

    const seconds = Math.round(diff / 1000);
    const minutes = Math.round(diff / 1000 / 60);
    const hours = Math.round(diff / 1000 / 60 / 60);
    const days = Math.round(diff / 1000 / 60 / 60 / 24);
    const years = Math.round(diff / 1000 / 60 / 60 / 24 / 365);

    if (seconds < 60) {
      return 'just now';
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 365) {
      return `${days} days ago`;
    } else {
      return `${years} years ago`;
    }
  }
}
