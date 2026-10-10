import style from './activeInput.module.css'

export interface ActiveInput {
  value: string;
  handleChange: (value: string) => void;
  type?: "string" | "number" | "select";
  options?: string[];
}

type ActiveInputProps = {
  width: string;
  activeInput: ActiveInput;
  setActiveInput: (input: any) => void;
};

export default function ActiveInput({
  activeInput,
  setActiveInput,
  width,
}: ActiveInputProps) {
  if (!activeInput) return null;

  return (
    <div
      style={{
        borderRadius: "6px",
        width: width,
      }}
    >
      <label
      className={style.label}
      >
        Dato real
      </label>
      {activeInput.type === "select" ? (
        <select
        className={style.input}
          value={activeInput.value}
          onChange={(e) => {
            const value = e.target.value;

            activeInput.handleChange(value);

            setActiveInput({
              ...activeInput,
              value,
            });
          }}
          disabled
        >
          <option value="">Seleccionar...</option>
          {activeInput.options?.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
        className={style.input}
          value={activeInput.value}
          onChange={(e) => {
            const raw = e.target.value;

            let clean = raw;

            if (activeInput.type === "number") {
              clean = raw.replace(/[^0-9.,]/g, "");
            }

            activeInput.handleChange(clean);

            setActiveInput({
              ...activeInput,
              value: clean,
            });
          }}
          disabled
        />
      )}
    </div>
  );
}
//IO
