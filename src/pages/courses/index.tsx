import React from "react";
import { Combobox } from "@/components/ui/ui-custom/combobox";
import { Spinner } from "@/components/ui/ui-custom/spinner";
import { ErrorScreen } from "@/components/ui/ui-custom/error-screen";
import { useApiOptions } from "@/hooks/use-api-options";

interface ClassData {
  id: number;
  courseId: number;
  moduleId: number;
  title: string;
  url: string;
  description: string;
}

export const CoursesList = () => {
  const [selectedDepartment, setSelectedDepartment] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState("");
  const [selectedModule, setSelectedModule] = React.useState("");
  const [selectedClass, setSelectedClass] = React.useState("");

  const {
    options: departmentOptions,
    isLoading: deptLoading,
    isError: deptError,
    error: deptErrorMsg,
  } = useApiOptions({ endpoint: "departments/list" });

  const {
    options: courseOptions,
    isLoading: courseLoading,
    isError: courseError,
    error: courseErrorMsg,
    refetch: refetchCourses,
  } = useApiOptions({
    endpoint: "courses/list",
    params: { departmentId: selectedDepartment },
    skip: !selectedDepartment,
  });

  const {
    options: moduleOptions,
    isLoading: moduleLoading,
    isError: moduleError,
    error: moduleErrorMsg,
    refetch: refetchModules,
  } = useApiOptions({
    endpoint: "modules/list",
    params: { courseId: selectedCourse },
    skip: !selectedCourse,
  });

  const {
    options: classOptions,
    data: classData,
    isLoading: classLoading,
    isError: classError,
    error: classErrorMsg,
    refetch: refetchClasses,
  } = useApiOptions<ClassData>({
    endpoint: "classes/list",
    params: { moduleId: selectedModule, courseId: selectedCourse },
    skip: !(selectedModule && selectedCourse),
  });

  const getVideoId = (url: string) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : null;
  };

  const selectedClassData = classData?.find(
    (cls) => cls.id.toString() === selectedClass
  );

  React.useEffect(() => {
    if (selectedDepartment) {
      setSelectedCourse("");
      setSelectedModule("");
      setSelectedClass("");
      refetchCourses();
    } else {
      setSelectedCourse("");
      setSelectedModule("");
      setSelectedClass("");
    }
  }, [selectedDepartment, refetchCourses]);

  React.useEffect(() => {
    if (selectedCourse) {
      setSelectedModule("");
      setSelectedClass("");
      refetchModules();
    } else {
      setSelectedModule("");
      setSelectedClass("");
    }
  }, [selectedCourse, refetchModules]);

  React.useEffect(() => {
    if (selectedModule) {
      setSelectedClass("");
      refetchClasses();
    } else {
      setSelectedClass("");
    }
  }, [selectedModule, refetchClasses]);

  if (deptLoading) return <Spinner />;
  if (deptError || courseError || moduleError || classError)
    return (
      <ErrorScreen
        message={
          deptErrorMsg ||
          courseErrorMsg ||
          moduleErrorMsg ||
          classErrorMsg ||
          "Erro ao carregar dados."
        }
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-12 pb-20 bg-[#0c0c0c] text-white">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Navegue pelo Conteúdo
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Departamento</label>
          <Combobox
            options={departmentOptions}
            placeholder="Selecione um departamento"
            searchPlaceholder="Buscar departamento..."
            defaultValue={selectedDepartment}
            onValueChange={setSelectedDepartment}
          />
        </div>
   

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Curso</label>
          <Combobox
            options={courseOptions || []}
            placeholder="Selecione um curso"
            searchPlaceholder="Buscar curso..."
            defaultValue={selectedCourse}
            onValueChange={setSelectedCourse}
            disabled={!selectedDepartment || courseLoading}
          />
          {courseLoading && <div>Carregando cursos...</div>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Módulo</label>
          <Combobox
            options={moduleOptions || []}
            placeholder="Selecione um módulo"
            searchPlaceholder="Buscar módulo..."
            defaultValue={selectedModule}
            onValueChange={setSelectedModule}
            disabled={!selectedCourse || moduleLoading}
          />
          {moduleLoading && <div>Carregando módulos...</div>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Aula</label>
          <Combobox
            options={classOptions || []}
            placeholder="Selecione uma aula"
            searchPlaceholder="Buscar aula..."
            defaultValue={selectedClass}
            onValueChange={setSelectedClass}
            disabled={!selectedModule || classLoading}
          />
          {classLoading && <div>Carregando aulas...</div>}
        </div>

        {selectedClassData && getVideoId(selectedClassData.url) && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Aula Selecionada
            </h2>
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getVideoId(
                  selectedClassData.url
                )}`}
                title="Aula"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
