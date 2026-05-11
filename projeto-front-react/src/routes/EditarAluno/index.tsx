import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TipoAluno } from "../../types/tipoAluno";
import { useForm } from "react-hook-form";

export default function EditarAluno() {

  const navigate = useNavigate();

  const { id } = useParams<string>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TipoAluno>({ mode: "onChange" });

  useEffect(() => {
    const callAluno = async () => {
      try {
        const response = await fetch(`http://localhost:3000/alunos/${id}`);

        if (response.ok) {
          const data: TipoAluno = await response.json();

          setValue("id", data.id);
          setValue("rm", data.rm, { shouldValidate: true });
          setValue("aluno", data.aluno, { shouldValidate: true });
          setValue("nota", data.nota, { shouldValidate: true });
        } else {
          throw new Error("Aluno inexistente");
        }
      } catch (error) {
        console.error(error);
      }
    };

    callAluno();
  }, [id,setValue]);


  const enviarDados = async  (al : TipoAluno)=>{
    
        const response = await fetch(`http://localhost:3000/alunos/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(al)
    });

    try {

        if (response.ok) {
            navigate("/alunos")
        } else {
          throw new Error("Ocorreu um erro ao editar o aluno!");
        }
      } catch (error) {
        console.error(error);
      }

  }

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
                  valueAsNumber: true,
                  required: true,
                  min: { value: 0.01, message: "Mínimo de 6 dígitos" }
                })}
              />
           <span>
                { errors.rm &&  <small className="bg-red-400 text-red-600" role="alert">{errors.rm.message}</small>}
              </span>
            </div>
            <div>
              <label htmlFor="aluno">ALUNO</label>
              <input
                type="text"
                {...register("aluno", {
                  required: "Obrigatório o preechimento!",
                  minLength: { value: 3, message: "Mínimo de 3 caractéres" },
                  maxLength: { value: 150, message: "Máximo de 150 caractéres" },
                })}
              />
              <span>
                { errors.aluno &&  <small className="bg-red-400 text-red-600" role="alert">{errors.aluno.message}</small>}
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
