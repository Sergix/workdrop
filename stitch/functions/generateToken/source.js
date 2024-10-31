exports = function(arg) {
  const uuid = require('uuid')

  const token = uuid.v4('workdrop.app', uuid.v5.DNS)
  const accessor = uuid.v4('workdrop.app', uuid.v5.DNS)

  return { token, accessor }
}
