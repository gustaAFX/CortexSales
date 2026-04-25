import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import { mockProducts } from "../features/products/mockData";

export function ProductsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button onClick={() => setOpen(true)}>Novo produto</Button>
      </div>

      <Card title="Catalogo de produtos">
        <Table
          rows={mockProducts}
          columns={[
            { key: "name", header: "Nome" },
            {
              key: "price",
              header: "Preco",
              render: (product) => `R$ ${product.price.toFixed(2)}`
            },
            { key: "description", header: "Descricao" }
          ]}
        />
      </Card>

      <Modal title="CRUD de produto (mock)" open={open} onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Nome"
          />
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Preco"
          />
          <textarea
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Descricao"
          />
          <Button>Salvar</Button>
        </div>
      </Modal>
    </div>
  );
}
