import { t } from "elysia";

export const UserCreateModels = t.Object({
  filename: t.String({ maxLength: 250, default: "" }),
  filepath: t.String({ default: "" }),
  file_avatar: t.File({
    type: "image/webp",
  }),
});

export interface UserCreateProps {
  filename: string;
  filepath: string;
  file_avatar: File;
}