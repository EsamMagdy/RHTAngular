import { mapClass } from '@dboneslabs/mpr/annotations/map-class';
import { mapProperty } from '@dboneslabs/mpr/annotations/map-property';
//@mapClass('models.keyValuePairs')
export class KeyValuePairs {
  // @mapProperty()
  key: number;
  // @mapProperty()
  value: string;
}
export class StringKeyValuePairs{
  key: string;
  value: string;

}
