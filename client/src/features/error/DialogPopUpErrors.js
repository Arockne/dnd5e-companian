import { Alert, Dialog, Text } from '@mantine/core'
import React from 'react'
import { AlertCircle } from 'tabler-icons-react'

function DialogPopUpErrors({ errors, setErrors }) {
  return (
    <Dialog
      opened={errors.length > 0}
      size="md"
      style={{ padding: 0, backgroundColor: 'transparent' }}
    >
      {errors.map((error, i) => {
        return (
          <Alert
            key={error}
            icon={<AlertCircle size={16} />}
            title="Bummer!"
            color="red"
            variant="outline"
            withCloseButton
            onClose={() =>
              setErrors([...errors.slice(0, i), ...errors.slice(i + 1)])
            }
          >
            <Text size="xs">{error}</Text>
          </Alert>
        )
      })}
    </Dialog>
  )
}

export default DialogPopUpErrors
