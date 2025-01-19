import ConfirmationDialog from '@/components/ConfirmationDialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDeleteAvailableExams } from '@/services/features/available-exams/available-exams.mutations';
import { useAvailableExams } from '@/services/features/available-exams/available-exams.queries';
import { useState } from 'react';

const GeneratedFormTable = () => {
  const { data, isLoading, error } = useAvailableExams();
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const { mutate: deleteAvailableExam } = useDeleteAvailableExams();

  if (isLoading) return <div>Loading..</div>;

  if (error) return <div>{error.message}</div>;

  const handleDelete = (item: string) => {
    setItemToDelete(item);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteAvailableExam(itemToDelete);
    }
    setOpenDialog(false);
    setItemToDelete(null); // Reset the item after deletion
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setItemToDelete(null); // Reset the item if canceling
  };

  console.log(data);
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Generated form lists</h1>

      <Table>
        <TableCaption>A list of form lists.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[450px]">Exam Type</TableHead>
            <TableHead>Available Months</TableHead>
            <TableHead>Available Dates</TableHead>
            <TableHead className="text-right sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((v) => (
            <TableRow key={v?._id}>
              <TableCell className="font-medium">
                {v?.exam_type?.exam_type ?? 'N/A'}
              </TableCell>
              <TableCell>{v?.months?.join(', ') ?? 'N/A'}</TableCell>
              <TableCell>{v?.dates?.join(', ') ?? 'N/A'}</TableCell>
              <TableCell>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(v._id)}>
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={openDialog}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Are you absolutely sure?"
        message={`This action cannot be undone. This will permanently delete your
            exam form and remove data from the servers ?`}
      />
    </div>
  );
};

export default GeneratedFormTable;
