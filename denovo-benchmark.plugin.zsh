typeset -gaU DENOVO_PATH
DENOVO_PATH+=("${0:a:h}")

function denovo-benchmark() {
	denovo-dispatch benchmark benchmark 64 1000 100 | jq -r .result
}
