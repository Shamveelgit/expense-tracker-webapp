import { X, Trash2, AlertTriangle } from 'lucide-react'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  budgetTitle: string
}

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, budgetTitle }: DeleteConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-2xl shadow-2xl max-w-md w-full border-2 border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Delete Budget</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
            <p className="text-foreground">
              Are you sure you want to delete the budget{' '}
              <span className="font-bold">"{budgetTitle}"</span>?
            </p>
          </div>

          <div className="p-4 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              ⚠️ <span className="font-medium">Warning:</span> This action cannot be undone. All budget data will be permanently removed.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-accent text-foreground rounded-lg hover:bg-accent/80 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-medium shadow-lg flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Budget
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
