import React, { useMemo, useEffect } from "react";
import {
  UseFormReturn,
  FieldValues,
  Path,
  Controller,
  PathValue,
} from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";

interface PricingItem {
  item: string;
  quantity: number;
  price: number;
  discount: number;
  amount: number;
}

interface PricingTableFieldProps<T extends FieldValues> {
  field: {
    name: Path<T>;
    label?: string;
    required?: boolean;
    showDiscount?: boolean;
    showExtraDiscount?: boolean;
    showTax?: boolean;
    defaultDiscount?: number;
    defaultExtraDiscount?: number;
    defaultTax?: number;
  };
  form: UseFormReturn<T>;
}

export const PricingTableField = <T extends FieldValues>({
  field,
  form,
}: PricingTableFieldProps<T>) => {
  // Watch the items array to trigger re-renders when it changes.
  const items =
    (form.watch(`${field.name}.items` as Path<T>) as PricingItem[]) || [];

  // Use useEffect to ensure there is always at least one item in the list
  // when the component first loads.
  useEffect(() => {
    if (items.length === 0) {
      form.setValue(
        `${field.name}.items` as Path<T>,
        [
          {
            item: "",
            quantity: 0,
            price: 0,
            discount: 0,
            amount: 0,
          },
        ] as PathValue<T, Path<T>>,
      );
    }
  }, [items, form, field.name]);

  // Set default values for discounts and tax
  const discount = field.defaultDiscount ?? 2;
  const extraDiscount = field.defaultExtraDiscount ?? 0;
  const tax = field.defaultTax ?? 0;

  const { subtotal, discountAmount, extraDiscountAmount, taxAmount, total } =
    useMemo(() => {
      const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
      const discountAmount = subtotal * (discount / 100);
      const afterDiscount = subtotal - discountAmount;
      const extraDiscountAmount = afterDiscount * (extraDiscount / 100);
      const afterExtraDiscount = afterDiscount - extraDiscountAmount;
      const taxAmount = afterExtraDiscount * (tax / 100);
      const total = afterExtraDiscount + taxAmount;

      return {
        subtotal,
        discountAmount,
        extraDiscountAmount,
        taxAmount,
        total,
      };
    }, [items, discount, extraDiscount, tax]);

  const addItem = () => {
    const currentItems =
      (form.getValues(`${field.name}.items` as Path<T>) as PricingItem[]) || [];

    const newItem: PricingItem = {
      item: "",
      quantity: 0,
      price: 0,
      discount: 0,
      amount: 0,
    };

    form.setValue(
      `${field.name}.items` as Path<T>,
      [...currentItems, newItem] as PathValue<T, Path<T>>,
    );
  };

  const removeItem = (index: number) => {
    // Prevent removing the last row.
    if (items.length > 1) {
      const currentItems =
        (form.getValues(`${field.name}.items` as Path<T>) as PricingItem[]) ||
        [];
      const newItems = currentItems.filter((_, i) => i !== index);
      form.setValue(
        `${field.name}.items` as Path<T>,
        newItems as PathValue<T, Path<T>>,
      );
    }
  };

  const calculateAmount = (index: number) => {
    const items = form.getValues(
      `${field.name}.items` as Path<T>,
    ) as PricingItem[];

    const item = items[index];
    if (!item) return;

    const quantity = item.quantity || 0;
    const price = item.price || 0;
    const discount = item.discount || 0;

    const discountAmount = quantity * price * (discount / 100);
    const amount = quantity * price - discountAmount;

    form.setValue(
      `${field.name}.items.${index}.amount` as Path<T>,
      amount as PathValue<T, Path<T>>,
    );
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
                Item
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
                Quantity
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
                Discount
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
                Amount
              </th>
              <th className="w-16 px-3 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {items.map((_, index) => (
              <tr key={index}>
                <td className="px-3 py-2">
                  <Controller
                    name={`${field.name}.items.${index}.item` as Path<T>}
                    control={form.control}
                    render={({ field: controllerField }) => (
                      <input
                        {...controllerField}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
                        placeholder="Item name"
                      />
                    )}
                  />
                </td>
                <td className="px-3 py-2">
                  <Controller
                    name={`${field.name}.items.${index}.quantity` as Path<T>}
                    control={form.control}
                    render={({ field: controllerField }) => (
                      <input
                        {...controllerField}
                        type="number"
                        min="0"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
                        placeholder="0"
                        onChange={(e) => {
                          controllerField.onChange(Number(e.target.value));
                          calculateAmount(index);
                        }}
                      />
                    )}
                  />
                </td>
                <td className="px-3 py-2">
                  <Controller
                    name={`${field.name}.items.${index}.price` as Path<T>}
                    control={form.control}
                    render={({ field: controllerField }) => (
                      <input
                        {...controllerField}
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
                        placeholder="0.00"
                        onChange={(e) => {
                          controllerField.onChange(Number(e.target.value));
                          calculateAmount(index);
                        }}
                      />
                    )}
                  />
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center">
                    <Controller
                      name={`${field.name}.items.${index}.discount` as Path<T>}
                      control={form.control}
                      render={({ field: controllerField }) => (
                        <input
                          {...controllerField}
                          type="number"
                          min="0"
                          max="100"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
                          placeholder="0"
                          onChange={(e) => {
                            controllerField.onChange(Number(e.target.value));
                            calculateAmount(index);
                          }}
                        />
                      )}
                    />
                    <span className="ml-1 text-sm text-gray-500">%</span>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <Controller
                    name={`${field.name}.items.${index}.amount` as Path<T>}
                    control={form.control}
                    render={({ field: controllerField }) => (
                      <input
                        {...controllerField}
                        readOnly
                        className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:outline-none"
                        placeholder="0.00"
                      />
                    )}
                  />
                </td>
                <td className="px-3 py-2">
                  {/* Conditionally render the button based on the row index */}
                  {index === 0 ? (
                    <button
                      type="button"
                      onClick={addItem}
                      className="text-secondary"
                    >
                      <PlusCircle size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td
                colSpan={4}
                className="px-3 py-3 text-right text-sm font-medium text-gray-700"
              >
                Subtotal
              </td>
              <td className="px-3 py-3 text-sm font-medium text-gray-700">
                ${subtotal.toFixed(2)}
              </td>
              <td></td>
            </tr>

            {(field.showDiscount ?? true) && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-3 text-right text-sm font-medium text-gray-700"
                >
                  Discount {discount}%
                </td>
                <td className="px-3 py-3 text-sm font-medium text-gray-700">
                  ${discountAmount.toFixed(2)}
                </td>
                <td></td>
              </tr>
            )}

            {(field.showExtraDiscount ?? true) && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-3 text-right text-sm font-medium text-gray-700"
                >
                  Extra Discount {extraDiscount}%
                </td>
                <td className="px-3 py-3 text-sm font-medium text-gray-700">
                  ${extraDiscountAmount.toFixed(2)}
                </td>
                <td></td>
              </tr>
            )}

            {(field.showTax ?? true) && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-3 text-right text-sm font-medium text-gray-700"
                >
                  Tax {tax}%
                </td>
                <td className="px-3 py-3 text-sm font-medium text-gray-700">
                  ${taxAmount.toFixed(2)}
                </td>
                <td></td>
              </tr>
            )}

            <tr className="border-t border-gray-200">
              <td
                colSpan={4}
                className="px-3 py-3 text-right text-sm font-bold text-gray-900"
              >
                Total
              </td>
              <td className="px-3 py-3 text-sm font-bold text-gray-900">
                ${total.toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PricingTableField;
