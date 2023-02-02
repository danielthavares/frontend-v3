const data = [
  { id: 1, name: "Daniel" },
  { id: 2, name: "Mirabel" },
  { id: 3, name: "Davi" },
  { id: 4, name: "Valéria" },
  { id: 5, name: "Arimatéia" },
  { id: 6, name: "Alex" },
  { id: 7, name: "Maria" },
  { id: 8, name: "José" },
  { id: 9, name: "João" },
  { id: 10, name: "Tiago" },
];

export function names(param: string): Promise<any> {
  if (param) {
    param = param.toLowerCase();
    const result = data.filter((x) => x.name.toLowerCase().includes(param));
    if (result && result.length > 0) return Promise.resolve(result);
    else return Promise.reject("Nenhum registro encontrado.");
  } else {
    return Promise.resolve(names);
  }
}
