import { Builder } from '@dboneslabs/mpr/initializing/builders/builder';
import { Types } from '@dboneslabs/mpr/core/types';
import { IndividualContractReq } from './individualContractReq.model';
import { Setup } from '@dboneslabs/mpr/initializing/setup';
import { ContactPreviousLocation } from './contactPreviousLocation.model';
import { City } from './city.model';
import { District } from './district.model';

export class MapSetup implements Setup {
  configure(builder: Builder): void {
    //register types, by registering the types mpr can automap

    //note as we used annotations we can scan
    //for the attributes/properties.
    builder.addType(IndividualContractReq).scanForAttributes();
    builder.addType(ContactPreviousLocation).scanForAttributes();
    builder.addType(City).scanForAttributes();
    builder.addType(District).scanForAttributes();

    //this is an annon/json type, so we detail what it looks like
    //note by detailing this mpr will know about the structure and be able setup any automappings
    // builder
    //   .addType('dto.contactPreviousLocation')
    //   .addIdProperty('cityId', Types.string)
    //   .addProperty('districtId', Types.string);

    //   builder.createMap<any, IndividualContractReq>("dto.contactPreviousLocation",IndividualContractReq);
    //   builder.createMap(IndividualContractReq, "dto.contactPreviousLocation");
    //register mappings, and use the dsl to override any automapping.
    //here you can see mpr will automap comments, owner, priority
    //and for the description and created properties it will do these provided actions.
    builder
      .createMap<ContactPreviousLocation, IndividualContractReq>(
        ContactPreviousLocation,
        IndividualContractReq
      )
      .forMember(
        (des) => des.address,
        (opt) => opt.mapFrom((a) => a.addressNotes)
      )
      .forMember(
        (dest) => dest.partmentNumber,
        (opt) => opt.mapFrom((s) => s.apartmentNumber)
      )
      .forMember(
        (dest) => dest.houseNo,
        (opt) => opt.mapFrom((s) => s.houseNumber)
      )
      .forMember(
        (dest) => dest.floorNo,
        (opt) =>
          opt.mapFrom((s) =>
            s.floorNumber.value == null ? 0 : s.floorNumber.key
          )
      )
      .forMember(
        (dest) => dest.houseType,
        (opt) =>
          opt.mapFrom((s) =>
            s.houseType.value == null ? 0 : s.houseType.key
          )
      )
      .forMember(
        (dest) => dest.cityId,
        (opt) => opt.mapFrom((s) => s.city.cityId)
      )
      .forMember(
        (dest) => dest.districtId,
        (opt) => opt.mapFrom((s) => s.district.districtId)
      )
      .forMember(
        (dest) => dest.selectedLocationId,
        (opt) => opt.mapFrom((s) => s.contactPreviouslocationId)
      );

    //note this one uses conventions to auto map the properties by matching name.
    builder.createMap(IndividualContractReq, ContactPreviousLocation);

    //as we map the person we can now support deep object hierarchies.
  }
}
