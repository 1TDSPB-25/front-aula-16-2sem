import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TipoAluno } from "../../types/tipoAluno";
import { useForm } from "react-hook-form";

export default function EditarAluno() {
  const navigate = useNavigate();

  const { rm } = useParams<string>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TipoAluno>({ mode: "onChange" });

  useEffect(() => {
    const callAluno = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/aluno/${rm}`);

        if (response.ok) {
          const data: TipoAluno = await response.json();

          setValue("rm", data.rm);
          setValue("nome", data.nome, { shouldValidate: true });
          setValue("turma", data.turma, { shouldValidate: true });
          setValue("nota", data.nota, { shouldValidate: true });
        } else {
          throw new Error("Aluno inexistente");
        }
      } catch (error) {
        console.error(error);
      }
    };

    callAluno();
  }, [rm, setValue]);

  const enviarDados = async (al: TipoAluno) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/aluno/${rm}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(al),
      },
    );

    try {
      if (response.ok) {
        navigate("/alunos");
      } else {
        throw new Error("Ocorreu um erro ao editar o aluno!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Lista de TURMAS
  const [turmas] = useState<string[]>([
  "1TDSPB","1TDSPA","1TDSPC","1TDSPD","1TDSPR","1TDSA"]);

  return (
    <main>
      <h1>Editar Aluno</h1>
      <div>
        <form className="formAluno" onSubmit={handleSubmit(enviarDados)}>
          <fieldset>
            <legend>Aluno</legend>
            <div>
              <label htmlFor="rm">RM</label>
              <input
                type="number"
                {...register("rm", {
                  required: true,
                  minLength: { value: 5, message: "Mínimo de 5 dígitos" },
                  maxLength: { value: 6, message: "Máximo de 6 dígitos" },
                })}
              />
              <span>
                {errors.rm && (
                  <small className="bg-red-400 text-red-600" role="alert">
                    {errors.rm.message}
                  </small>
                )}
              </span>
            </div>
            <div>
              <label htmlFor="nome">NOME</label>
              <input
                type="text"
                {...register("nome", {
                  required: "Obrigatório o preechimento!",
                  minLength: { value: 3, message: "Mínimo de 3 caractéres" },
                  maxLength: {
                    value: 150,
                    message: "Máximo de 150 caractéres",
                  },
                })}
              />
              <span>
                {errors.nome && (
                  <small className="bg-red-400 text-red-600" role="alert">
                    {errors.nome.message}
                  </small>
                )}
              </span>
            </div>

            <div>
              <label htmlFor="turma">TURMA</label>
              <select
                {...register("turma", {
                  required: "Obrigatório o preechimento!",
                })}
              >
                <option value="">SELECIONE UMA TURMA</option>
                {turmas.map(t => (
                  <option key={t}  value={t}>{t}</option>
                ))}
                
              </select>
              <span>
                {errors.turma && (
                  <small className="bg-red-400 text-red-600" role="alert">
                    {errors.turma.message}
                  </small>
                )}
              </span>
            </div>

            <div>
              <label htmlFor="nota">NOTA</label>
              <input
                type="number"
                step={0.01}
                {...register("nota", {
                  valueAsNumber: true,
                  required: true,
                  min: { value: 0, message: "Valor mínimo é zero." },
                  max: { value: 10, message: "Valor máximo é 10" },
                })}
              />
            </div>
            <div>
              <button type="submit">Enviar</button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
