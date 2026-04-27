import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import { mockProducts } from "../features/products/mockData";

export function ProductsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-white/5 bg-[rgba(17,19,29,0.95)] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <h2 className="text-2xl font-bold text-white">Produtos</h2>
        <p className="mt-2 text-sm text-[#A1A1B5]">
          Gerencie catálogo, posicionamento comercial e valor percebido por segmento.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Catalogo de produtos</h3>
        <Button onClick={() => setOpen(true)}>Novo produto</Button>
      </div>

      <Card>
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
            className="h-12 w-full rounded-[14px] border border-white/10 bg-[#0D1018] px-3 py-2 text-sm text-white placeholder:text-[#6B7280] focus:border-violet-400/50 focus:outline-none"
            placeholder="Nome"
          />
          <input
            className="h-12 w-full rounded-[14px] border border-white/10 bg-[#0D1018] px-3 py-2 text-sm text-white placeholder:text-[#6B7280] focus:border-violet-400/50 focus:outline-none"
            placeholder="Preco"
          />
          <textarea
            className="w-full rounded-[14px] border border-white/10 bg-[#0D1018] px-3 py-2 text-sm text-white placeholder:text-[#6B7280] focus:border-violet-400/50 focus:outline-none"
            placeholder="Descricao"
          />
          <Button>Salvar</Button>
        </div>
      </Modal>
    </div>
  );
}
