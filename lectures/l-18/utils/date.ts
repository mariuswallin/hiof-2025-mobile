import { format as dfnsFormat } from "date-fns";

export const format = (date: Date): string => {
	return dfnsFormat(date, "dd.MM.yyyy");
};
