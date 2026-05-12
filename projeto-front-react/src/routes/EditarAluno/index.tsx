import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TipoAluno } from "../../types/tipoAluno";
import { useForm } from "react-hook-form";

export default function EditarAluno() {

  const navigate = useNavigate()

  const { rm } = useParams<string>();
  console.log(rm);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TipoAluno>({ mode: "onChange" });

  useEffect(() => {
    const callAluno = async () => {
      try {
        // const response = await fetch(`http://localhost:3000/alunos/${id}`);
        const response = await fetch(`https://projetoaluno-69jw.onrender.com/aluno/${rm}`);

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
  }, [rm,setValue]);


const onSubmit = (aluno : TipoAluno)=>{

  const updateAluno = async()=>{
  try {

      console.log(aluno);
      const response = await fetch(`https://projetoaluno-69jw.onrender.com/aluno`,{
        method:"PUT",
        headers:{
        "Content-Type":"application/json"
      },
        body: JSON.stringify(aluno)
     });

     if(!response.ok){
        throw new Error("Ocorreu um erro na atualização!");
     }
        alert("Aluno atualizado com sucesso!");
        navigate("/alunos");

  } catch (error) {
    console.error(error);
  }
 }

 updateAluno();

}

  return (
    <main>
      <h1>Editar Aluno</h1>
      <div>
        <form className="formAluno" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Aluno</legend>
            <div>
              <label htmlFor="rm">RM</label>
              <input
                type="number"
                {...register("rm", {
                  valueAsNumber: true,
                  required: "O RM é obrigatório",
                  min: { value: 0, message: "Mínimo de 0 dígitos" },
                  max: { value: 99999, message: "Máximo de 999999 dígitos" },
                })}
              />
              {errors.rm && (
                <span className="text-red-400">{errors.rm.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="nome">ALUNO</label>
              <input
                type="text"
                {...register("nome", {
                  required: true,
                  minLength: { value: 3, message: "Mínimo de 3 caractéres" },
                  maxLength: { value: 150, message: "Máximo de 150 caractéres" },
                })}
              />
              {errors.nome && (
                <span className="text-red-400">{errors.nome.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="turma">TURMA</label>
              <input
                type="text"
                {...register("turma", {
                  required: "Campo obrigatório!",
                  minLength: { value: 5, message: "Número min de caracteres 5." },
                  maxLength: { value: 6, message: "Número max de caracteres 6." },
                })}
              />
              {errors.turma && (
                <span className="text-red-400">{errors.turma.message}</span>
              )}
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
              {errors.nota && (
                <span className="text-red-400">{errors.nota.message}</span>
              )}
            </div>
            <div>
              <button type="submit">Atualizar</button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
