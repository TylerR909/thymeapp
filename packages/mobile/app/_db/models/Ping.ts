import { Model } from "@nozbe/watermelondb";
import {
  date,
  readonly,
  nochange,
  field,
} from "@nozbe/watermelondb/decorators";

export default class Ping extends Model {
  static table = "pings";

  @nochange @field("latitude") latitude!: number;
  @nochange @field("longitude") longitude!: number;
  @nochange @date("timestamp") timestamp!: Date;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
}
